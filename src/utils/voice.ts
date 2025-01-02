import { spawn } from 'child_process';
import path from "path";
import { EdgeTTS } from 'node-edge-tts'
import nlp from 'compromise';
import * as fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
let isSkipping = false;
let isCancelled = false;

export function skipAudio() {
    isSkipping = true;
}

export function cancelAudio() {
    isCancelled = true;
}
let isVoiceEnabled = false
let selectedVoice = 'en-GB-RyanNeural'

/**
 * Set voice configuration
 * @param enabled boolean
 */
export const setVoiceEnabled = (enabled: boolean): void => {
    isVoiceEnabled = enabled
}

/**
 * Set selected voice
 * @param voice string
 */
export const setSelectedVoice = (voice: string): void => {
    selectedVoice = voice
}

/**
 * Get current selected voice
 */
export const getSelectedVoice = (): string => {
    return selectedVoice
}
async function joinMP3Files(inputFiles: string[], outputFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const ffmpegCommand = ffmpeg();

        inputFiles.forEach(inputFile => {
            ffmpegCommand.input(inputFile);
        });

        ffmpegCommand
            .mergeToFile(outputFile, "./")
            .on('start', function (commandLine) {
                console.log('Spawned FFmpeg with command: ' + commandLine);
            })
            .on('end', function () {
                console.log('Merging finished!');
                resolve();
            })
            .on('error', function (err) {
                console.error('Error: ' + err);
                reject(err);
            });
    });
}


function cleanText(input: string): string {

    
    const thinkingMatches = [...input.matchAll(/<thinking>([\s\S]*?)<\/thinking>/g)]
        .map(match => match[1])
        .join(" "); // Join all <thinking> matches with spaces

    const questionMatches = [...input.matchAll(/<question>([\s\S]*?)<\/question>/g)]
        .map(match => match[1])
        .join(" "); // Join all <result> matches with spaces

    const resultMatches = [...input.matchAll(/<result>([\s\S]*?)<\/result>/g)]
        .map(match => match[1])
        .join(" "); // Join all <result> matches with spaces

    return (
        thinkingMatches + " " + questionMatches + " " + resultMatches
    )
        .replace(/```[\s\S]*?```/g, "")
        .replace(/launch file:\/\/\S+/g, "")
        .replace(/\[Response interrupted[^\]]*\]/g, "")
        .replace(/\{\s*\{\s*[\s\S]*?\s*\}\s*\}/g, "")
        .replace(/\{.*?\}/g, "")
        .replace(/<[^>]*>/g, "")
        .replace(/\*/g, "")
        .replace(/\#/g, "")
        .replace(/\&/g, " and ")
        .replace(/\@/g," at ")
        .trim();
}

// Helper: Split text into smaller chunks
function splitIntoChunks(text: string, maxLength = 150): string[] {
    const sentences = nlp(text).sentences().out('array');
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
        if (currentChunk.length + sentence.length + 1 > maxLength) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += ` ${sentence}`;
        }
    }
    if (currentChunk) {chunks.push(currentChunk.trim());}
        return chunks;
}
async function playAudioWithVolume(filePath: string, volume: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const ffmpegProcess = spawn('ffplay', ['-nodisp', '-autoexit', `-af`, `volume=${volume}`, filePath]);

        ffmpegProcess.on('error', (err) => {
            reject(`Error playing file with FFmpeg: ${err}`);
        });

        ffmpegProcess.on('close', () => {
            resolve();
        });
    });
}

// Helper function to retrieve duration
async function getAudioDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                reject(`Error retrieving audio metadata: ${err.message}`);
            } else {
                const duration = metadata.format.duration; // Duration in seconds
                if (!duration) {
                    reject('Unable to determine duration from metadata.');
                } else {
                    resolve(duration);
                }
            }
        });
    });
}
export default async function playVoice(assistantMessage: string )  {

    if (!isVoiceEnabled){
        console.log("Voice disabled")
        return
    }
        const filePathBase = path.join('C:/Users/Robag/Music', 'output');
        const dirtyFilePathText = path.join('C:/Users/Robag/Music', `dirty-tts-${Date.now()}.txt`);
        
        try {
            fs.appendFileSync(dirtyFilePathText, assistantMessage, 'utf8');
            console.log("Content appended successfully!");
        } catch (err) {
            console.error("An error occurred while appending to the file:", err);
        }

        const chunks = splitIntoChunks(cleanText(assistantMessage), 150); // Split text into small chunks (max 150 characters)
        const cleanFilePathText = path.join('C:/Users/Robag/Music', `clean-tts-${Date.now()}.txt`);
        
        try {
            fs.appendFileSync(cleanFilePathText, chunks.join(" "), 'utf8');
            console.log("Content appended successfully!");
        } catch (err) {
            console.error("An error occurred while appending to the file:", err);
        }
        if (chunks.length === 0) {
            console.log("nothing needed to read")
            return
        }
        const audioFiles: string[] = [];
        
        console.log(`Text split into ${chunks.length} chunks.`);

        try {
            const tts = new EdgeTTS({
                voice: selectedVoice,
                outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
                timeout: 60000, // Increase timeout to 60 seconds
            });

            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                if (chunk !== "") {
                    const filePath = `${filePathBase}_part${i + 1}.mp3`;
                    console.log(`Generating TTS for chunk ${i + 1}: "${chunk}"`);
                    await tts.ttsPromise(chunk, filePath);

                    console.log(`Saved audio file: ${filePath}`);
                    audioFiles.push(filePath);
                } else {
                    console.log("Skipping empty chunk")
                }
            }

            
    console.log("Audiofiles length: ", audioFiles.length)
    try {
        if (audioFiles.length > 1) {
            const outputFile = 'C:/Users/Robag/Music/merged_audio.mp3';
            await joinMP3Files(audioFiles, outputFile);
            console.log('Successfully merged MP3 files.');
            (async () => {
                const filePath = outputFile; // Replace with your file path
                try {
                    const duration = await getAudioDuration(filePath);
                    console.log(`Audio duration: ${duration} seconds`);
                    await playAudioWithVolume(filePath, 1.0);

                } catch (err) {
                    console.error(err);
                }
            })();}
        else {
            const audioFile = audioFiles[0];
            const duration = await getAudioDuration(audioFile);
                    console.log(`Audio duration: ${duration} seconds`);
                    await playAudioWithVolume(audioFile, 1.0);
        }
        }
     
    catch (error) {
        console.error('Failed to merge MP3 files:', error);
    }
        } catch (error) {
                    console.error('Error generating TTS:', error);
                    throw error 
                }
    }