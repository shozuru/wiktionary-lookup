import './App.css'
import { useState } from 'react'
import FrequencyDisplay from './components/FrequencyDisplay'
import Dropdown from './components/Dropdown/Dropdown.tsx'
import { LanguageCodes, LanguageNames } from './types/languageNames.ts'
import { LanguageContext } from './context/LanguageContext.tsx'


function App() {

    const [languageType, setLanguageType] =
        useState<LanguageCodes>(LanguageCodes.FRENCH)
    const [languageDisplayName, setLanguageDisplayName] =
        useState<LanguageNames>(LanguageNames.FRENCH)

    const languages: { value: LanguageCodes, label: LanguageNames }[] = [
        { value: LanguageCodes.FRENCH, label: LanguageNames.FRENCH },
        { value: LanguageCodes.PORTUGUESE, label: LanguageNames.PORTUGUESE },
        // { value: LanguageCodes.SPANISH, label: LanguageNames.SPANISH },
        // { value: LanguageCodes.ROMANIAN, label: LanguageNames.ROMANIAN },
        { value: LanguageCodes.ITALIAN, label: LanguageNames.ITALIAN },
        { value: LanguageCodes.KOREAN, label: LanguageNames.KOREAN },
        { value: LanguageCodes.DANISH, label: LanguageNames.DANISH },
        // { value: LanguageCodes.NORWEGIAN, label: LanguageNames.NORWEGIAN }
    ]

    const value = { languageType, setLanguageType }

    const handleLanguageSelect =
        (languageCode: LanguageCodes, languageName: LanguageNames) => {

            setLanguageType(languageCode)
            setLanguageDisplayName(languageName)
        }

    return (

        <div
            className='app-container'
        >
            <header
                className='app-header'
            >
                <h1
                    className='title'
                >
                    Wiktionary Word Look-Up
                </h1>

            </header>

            <main
                className='main-app-component'
            >
                <div
                    className='language-selector-container'
                >
                    <span
                        className='select-language-prompt'
                    >
                        Please select a language:
                    </span>

                    <Dropdown
                        options={languages}
                        onSelect={handleLanguageSelect}
                        placeholder='Select a language'
                    />
                </div>

                <div
                    className='language-display-container'
                >
                    <span
                        className='display-text'
                    >
                        Currently displaying the 200 most frequently
                        used words for:

                    </span>
                    <span
                        className='language'
                    >
                        {languageDisplayName}
                    </span>

                </div>

                <LanguageContext
                    value={value}
                >
                    <FrequencyDisplay />
                </LanguageContext>

            </main>

        </div>
    )
}

export default App
