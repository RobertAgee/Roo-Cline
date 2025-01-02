import { VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react"
import { memo } from "react"
import { vscode } from "../../utils/vscode"

type VoiceOptionsProps = {
	currentVoice: string
	setCurrentVoice: (voice: string) => void
}

const VoiceOptions = ({ currentVoice, setCurrentVoice }: VoiceOptionsProps) => {
	return (
		<VSCodeDropdown
			style={{ width: "100%" }}
			value={currentVoice}
			onChange={(e: any) => {
				const newVoice = e.target.value;
				console.log(newVoice);
				setCurrentVoice(newVoice);
				// Send message to update voice selection
				vscode.postMessage({ type: "currentVoice", voice: newVoice });
			}}>
			{/* British English */}
			<VSCodeOption value="en-GB-RyanNeural">British English - Ryan (Male)</VSCodeOption>
			<VSCodeOption value="en-GB-SoniaNeural">British English - Sonia (Female)</VSCodeOption>
			<VSCodeOption value="en-GB-ThomasNeural">British English - Thomas (Male)</VSCodeOption>
			<VSCodeOption value="en-GB-LibbyNeural">British English - Libby (Female)</VSCodeOption>
			
			{/* American English */}
			<VSCodeOption value="en-US-GuyNeural">American English - Guy (Male)</VSCodeOption>
			<VSCodeOption value="en-US-JennyNeural">American English - Jenny (Female)</VSCodeOption>
			<VSCodeOption value="en-US-SteffanNeural">American English - Steffan (Male)</VSCodeOption>
			<VSCodeOption value="en-US-AriaNeural">American English - Aria (Female)</VSCodeOption>

			{/* Other English Variants */}
			<VSCodeOption value="en-AU-WilliamNeural">Australian English - William (Male)</VSCodeOption>
			<VSCodeOption value="en-AU-NatashaNeural">Australian English - Natasha (Female)</VSCodeOption>
			<VSCodeOption value="en-IE-ConnorNeural">Irish English - Connor (Male)</VSCodeOption>
			<VSCodeOption value="en-IE-EmilyNeural">Irish English - Emily (Female)</VSCodeOption>
			<VSCodeOption value="en-IN-PrabhatNeural">Indian English - Prabhat (Male)</VSCodeOption>
			<VSCodeOption value="en-IN-NeerjaNeural">Indian English - Neerja (Female)</VSCodeOption>
			<VSCodeOption value="en-ZA-LukeNeural">South African English - Luke (Male)</VSCodeOption>
			<VSCodeOption value="en-ZA-LeahNeural">South African English - Leah (Female)</VSCodeOption>
			<VSCodeOption value="en-NZ-MitchellNeural">New Zealand English - Mitchell (Male)</VSCodeOption>
			<VSCodeOption value="en-NZ-MollyNeural">New Zealand English - Molly (Female)</VSCodeOption>
			<VSCodeOption value="en-PH-JamesNeural">Philippine English - James (Male)</VSCodeOption>
			<VSCodeOption value="en-PH-RosaNeural">Philippine English - Rosa (Female)</VSCodeOption>
			<VSCodeOption value="en-SG-WayneNeural">Singaporean English - Wayne (Male)</VSCodeOption>
			<VSCodeOption value="en-SG-LunaNeural">Singaporean English - Luna (Female)</VSCodeOption>

			{/* Spanish Variants */}
			<VSCodeOption value="es-ES-AlvaroNeural">Spanish (Spain) - Alvaro (Male)</VSCodeOption>
			<VSCodeOption value="es-ES-ElviraNeural">Spanish (Spain) - Elvira (Female)</VSCodeOption>
			<VSCodeOption value="es-MX-JorgeNeural">Spanish (Mexico) - Jorge (Male)</VSCodeOption>
			<VSCodeOption value="es-MX-DaliaNeural">Spanish (Mexico) - Dalia (Female)</VSCodeOption>
			<VSCodeOption value="es-CO-GonzaloNeural">Spanish (Colombia) - Gonzalo (Male)</VSCodeOption>
			<VSCodeOption value="es-CO-SalomeNeural">Spanish (Colombia) - Salome (Female)</VSCodeOption>
			<VSCodeOption value="es-AR-TomasNeural">Spanish (Argentina) - Tomas (Male)</VSCodeOption>
			<VSCodeOption value="es-AR-ElenaNeural">Spanish (Argentina) - Elena (Female)</VSCodeOption>
			
			{/* Portuguese */}
			<VSCodeOption value="pt-BR-AntonioNeural">Portuguese - Antonio (Male)</VSCodeOption>
			<VSCodeOption value="pt-BR-FranciscaNeural">Portuguese - Francisca (Female)</VSCodeOption>
			<VSCodeOption value="pt-PT-DuarteNeural">Portuguese (PT) - Duarte (Male)</VSCodeOption>
			<VSCodeOption value="pt-PT-RaquelNeural">Portuguese (PT) - Raquel (Female)</VSCodeOption>
		
			{/* European Languages */}
			<VSCodeOption value="fr-FR-HenriNeural">French - Henri (Male)</VSCodeOption>
			<VSCodeOption value="fr-FR-DeniseNeural">French - Denise (Female)</VSCodeOption>
			<VSCodeOption value="de-DE-KillianNeural">German - Killian (Male)</VSCodeOption>
			<VSCodeOption value="de-DE-KatjaNeural">German - Katja (Female)</VSCodeOption>
			<VSCodeOption value="it-IT-DiegoNeural">Italian - Diego (Male)</VSCodeOption>
			<VSCodeOption value="it-IT-ElsaNeural">Italian - Elsa (Female)</VSCodeOption>
			<VSCodeOption value="nl-NL-MaartenNeural">Dutch - Maarten (Male)</VSCodeOption>
			<VSCodeOption value="nl-NL-ColetteNeural">Dutch - Colette (Female)</VSCodeOption>
			<VSCodeOption value="pl-PL-MarekNeural">Polish - Marek (Male)</VSCodeOption>
			<VSCodeOption value="pl-PL-ZofiaNeural">Polish - Zofia (Female)</VSCodeOption>

			{/* Eastern European Languages */}
			<VSCodeOption value="ru-RU-DmitryNeural">Russian - Dmitry (Male)</VSCodeOption>
			<VSCodeOption value="ru-RU-SvetlanaNeural">Russian - Svetlana (Female)</VSCodeOption>
			<VSCodeOption value="uk-UA-OstapNeural">Ukrainian - Ostap (Male)</VSCodeOption>
			<VSCodeOption value="uk-UA-PolinaNeural">Ukrainian - Polina (Female)</VSCodeOption>
			<VSCodeOption value="ro-RO-EmilNeural">Romanian - Emil (Male)</VSCodeOption>
			<VSCodeOption value="ro-RO-AlinaNeural">Romanian - Alina (Female)</VSCodeOption>
			<VSCodeOption value="cs-CZ-AntoninNeural">Czech - Antonin (Male)</VSCodeOption>
			<VSCodeOption value="cs-CZ-VlastaNeural">Czech - Vlasta (Female)</VSCodeOption>
			<VSCodeOption value="hu-HU-TamasNeural">Hungarian - Tamas (Male)</VSCodeOption>
			<VSCodeOption value="hu-HU-NoemiNeural">Hungarian - Noemi (Female)</VSCodeOption>
			<VSCodeOption value="sk-SK-LukasNeural">Slovak - Lukas (Male)</VSCodeOption>
			<VSCodeOption value="sk-SK-ViktoriaNeural">Slovak - Viktoria (Female)</VSCodeOption>

			{/* Nordic Languages */}
			<VSCodeOption value="sv-SE-MattiasNeural">Swedish - Mattias (Male)</VSCodeOption>
			<VSCodeOption value="sv-SE-SofieNeural">Swedish - Sofie (Female)</VSCodeOption>
			<VSCodeOption value="nb-NO-FinnNeural">Norwegian - Finn (Male)</VSCodeOption>
			<VSCodeOption value="nb-NO-IselinNeural">Norwegian - Iselin (Female)</VSCodeOption>
			<VSCodeOption value="da-DK-ChristofferNeural">Danish - Christoffer (Male)</VSCodeOption>
			<VSCodeOption value="da-DK-SofieNeural">Danish - Sofie (Female)</VSCodeOption>
			<VSCodeOption value="fi-FI-HarriNeural">Finnish - Harri (Male)</VSCodeOption>
			<VSCodeOption value="fi-FI-NooraNeural">Finnish - Noora (Female)</VSCodeOption>

			{/* Asian Languages */}
			{/* East Asian */}
			<VSCodeOption value="ja-JP-KeitaNeural">Japanese - Keita (Male)</VSCodeOption>
			<VSCodeOption value="ja-JP-NanamiNeural">Japanese - Nanami (Female)</VSCodeOption>
			<VSCodeOption value="ko-KR-InJoonNeural">Korean - InJoon (Male)</VSCodeOption>
			<VSCodeOption value="ko-KR-SunHiNeural">Korean - SunHi (Female)</VSCodeOption>

			{/* Chinese Variants */}
			<VSCodeOption value="zh-CN-YunxiNeural">Chinese (Mainland) - Yunxi (Male)</VSCodeOption>
			<VSCodeOption value="zh-CN-XiaoxiaoNeural">Chinese (Mainland) - Xiaoxiao (Female)</VSCodeOption>
			<VSCodeOption value="zh-TW-YunJheNeural">Chinese (Taiwan) - YunJhe (Male)</VSCodeOption>
			<VSCodeOption value="zh-TW-HsiaoYuNeural">Chinese (Taiwan) - HsiaoYu (Female)</VSCodeOption>
			<VSCodeOption value="zh-HK-WanLungNeural">Chinese (Hong Kong) - WanLung (Male)</VSCodeOption>
			<VSCodeOption value="zh-HK-HiuGaaiNeural">Chinese (Hong Kong) - HiuGaai (Female)</VSCodeOption>

			{/* Southeast Asian */}
			<VSCodeOption value="th-TH-NiwatNeural">Thai - Niwat (Male)</VSCodeOption>
			<VSCodeOption value="th-TH-PremwadeeNeural">Thai - Premwadee (Female)</VSCodeOption>
			<VSCodeOption value="vi-VN-NamMinhNeural">Vietnamese - NamMinh (Male)</VSCodeOption>
			<VSCodeOption value="vi-VN-HoaiMyNeural">Vietnamese - HoaiMy (Female)</VSCodeOption>
			<VSCodeOption value="id-ID-ArdiNeural">Indonesian - Ardi (Male)</VSCodeOption>
			<VSCodeOption value="id-ID-GadisNeural">Indonesian - Gadis (Female)</VSCodeOption>
			<VSCodeOption value="ms-MY-OsmanNeural">Malay - Osman (Male)</VSCodeOption>
			<VSCodeOption value="ms-MY-YasminNeural">Malay - Yasmin (Female)</VSCodeOption>
			<VSCodeOption value="fil-PH-AngeloNeural">Filipino - Angelo (Male)</VSCodeOption>
			<VSCodeOption value="fil-PH-MariaNeural">Filipino - Maria (Female)</VSCodeOption>

			{/* South Asian */}
			<VSCodeOption value="hi-IN-MadhurNeural">Hindi - Madhur (Male)</VSCodeOption>
			<VSCodeOption value="hi-IN-SwaraNeural">Hindi - Swara (Female)</VSCodeOption>
			<VSCodeOption value="ta-IN-ValluvarNeural">Tamil - Valluvar (Male)</VSCodeOption>
			<VSCodeOption value="ta-IN-PallaviNeural">Tamil - Pallavi (Female)</VSCodeOption>
			<VSCodeOption value="bn-IN-BashkarNeural">Bengali - Bashkar (Male)</VSCodeOption>
			<VSCodeOption value="bn-IN-TanishaaNeural">Bengali - Tanishaa (Female)</VSCodeOption>
			<VSCodeOption value="ur-PK-AsadNeural">Urdu - Asad (Male)</VSCodeOption>
			<VSCodeOption value="ur-PK-UzmaNeural">Urdu - Uzma (Female)</VSCodeOption>
			<VSCodeOption value="gu-IN-NiranjanNeural">Gujarati - Niranjan (Male)</VSCodeOption>
			<VSCodeOption value="gu-IN-DhwaniNeural">Gujarati - Dhwani (Female)</VSCodeOption>
			<VSCodeOption value="mr-IN-ManoharNeural">Marathi - Manohar (Male)</VSCodeOption>
			<VSCodeOption value="mr-IN-AarohiNeural">Marathi - Aarohi (Female)</VSCodeOption>

			{/* Middle Eastern */}
			<VSCodeOption value="ar-SA-HamedNeural">Arabic - Hamed (Male)</VSCodeOption>
			<VSCodeOption value="ar-SA-ZariyahNeural">Arabic - Zariyah (Female)</VSCodeOption>
			<VSCodeOption value="ar-AE-HamdanNeural">Arabic (UAE) - Hamdan (Male)</VSCodeOption>
			<VSCodeOption value="ar-AE-FatimaNeural">Arabic (UAE) - Fatima (Female)</VSCodeOption>
			<VSCodeOption value="ar-EG-ShakirNeural">Arabic (Egypt) - Shakir (Male)</VSCodeOption>
			<VSCodeOption value="ar-EG-SalmaNeural">Arabic (Egypt) - Salma (Female)</VSCodeOption>
			<VSCodeOption value="fa-IR-AminNeural">Persian - Amin (Male)</VSCodeOption>
			<VSCodeOption value="fa-IR-DilaraNeural">Persian - Dilara (Female)</VSCodeOption>
			<VSCodeOption value="he-IL-AvriNeural">Hebrew - Avri (Male)</VSCodeOption>
			<VSCodeOption value="he-IL-HilaNeural">Hebrew - Hila (Female)</VSCodeOption>
			<VSCodeOption value="tr-TR-AhmetNeural">Turkish - Ahmet (Male)</VSCodeOption>
			<VSCodeOption value="tr-TR-EmelNeural">Turkish - Emel (Female)</VSCodeOption>

			{/* African Languages */}
			<VSCodeOption value="sw-KE-RafikiNeural">Swahili - Rafiki (Male)</VSCodeOption>
			<VSCodeOption value="sw-KE-ZuriNeural">Swahili - Zuri (Female)</VSCodeOption>
			<VSCodeOption value="am-ET-AmehaNeural">Amharic - Ameha (Male)</VSCodeOption>
			<VSCodeOption value="am-ET-MekdesNeural">Amharic - Mekdes (Female)</VSCodeOption>
			<VSCodeOption value="zu-ZA-ThembaNeural">Zulu - Themba (Male)</VSCodeOption>
			<VSCodeOption value="zu-ZA-ThembiNeural">Zulu - Thembi (Female)</VSCodeOption>
			<VSCodeOption value="yo-NG-OlayinkaNeural">Yoruba - Olayinka (Male)</VSCodeOption>
			<VSCodeOption value="yo-NG-AyoNeural">Yoruba - Ayo (Female)</VSCodeOption>
			<VSCodeOption value="ha-NG-AbbubakarNeural">Hausa - Abbubakar (Male)</VSCodeOption>
			<VSCodeOption value="ha-NG-AminaNeural">Hausa - Amina (Female)</VSCodeOption>
			<VSCodeOption value="so-SO-MuuseNeural">Somali - Muuse (Male)</VSCodeOption>
			<VSCodeOption value="so-SO-UbaxNeural">Somali - Ubax (Female)</VSCodeOption>
			<VSCodeOption value="rw-RW-KarembeNeural">Kinyarwanda - Karembe (Male)</VSCodeOption>
			<VSCodeOption value="rw-RW-InezaNeural">Kinyarwanda - Ineza (Female)</VSCodeOption>
</VSCodeDropdown>
	)
}

export default memo(VoiceOptions)