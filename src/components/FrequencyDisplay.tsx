import React, { useState, useEffect } from "react"
import WordInfoModal from "./WordInfoModal/WordInfoModal.tsx"
import PageControls from "./PageControls.tsx"
import type { WordInfo } from "../types/wordInfo.ts"
import frequencyFr from '../data/frequency-fr.json'
import frequencyPt from '../data/frequency-pt.json'
import frequencySp from '../data/frequency-sp.json'
import frequencyRo from '../data/frequency-ro.json'
import frequencyIt from '../data/frequency-it.json'
import frequencyKo from '../data/frequency-ko.json'
import frequencyDa from '../data/frequency-da.json'
import frequencyNb from '../data/frequency-nb.json'
import { useLanguage } from "../context/LanguageContext.tsx"
import { LanguageCodes } from "../types/languageNames.ts"

const wordInfoMap: Record<string, WordInfo> = {}

const FrequencyDisplay: React.FC = () => {

    const frequencyLists = {
        fr: frequencyFr,
        pt: frequencyPt,
        sp: frequencySp,
        ro: frequencyRo,
        it: frequencyIt,
        ko: frequencyKo,
        da: frequencyDa,
        nb: frequencyNb
    }

    const { languageType } = useLanguage()

    const currentFrequencyList = frequencyLists[languageType]

    const [showWords, setShowWords] = useState<boolean>(false)
    const [frequencyWords, setFrequencyWords] =
        useState<{ index: number; word: string }[]>([])

    useEffect(() => {
        setFrequencyWords(currentFrequencyList)
    }, [currentFrequencyList])


    const [currentPage, setCurrentPage] = useState<number>(1)
    const wordsPerPage = 25

    const indexOfLastWord = currentPage * wordsPerPage
    const indexOfFirstWord = indexOfLastWord - wordsPerPage

    const currentWords =
        frequencyWords.slice(indexOfFirstWord, indexOfLastWord)

    const [selectedWord, setSelectedWord] = useState<string | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)


    // useEffect(() => {

    //     const fetchFreqs = async () => {
    //         const res =
    //             await fetch('http://localhost:3010/lookup/frequency')
    //         const data: { index: number; word: string }[] =
    //             await res.json()

    //         console.log(data)
    //         // setFrequencyWords(data)
    //     }
    //     if (languageType === LanguageCodes.NORWEGIAN) {
    //         fetchFreqs()

    //     }
    // }, [languageType])

    const handleToggleShow = () => {
        setShowWords(prev => !prev)
    }

    const handleWordSelection =
        (item: { index: number; word: string }) => {
            setSelectedWord(item.word)
            setSelectedIndex(item.index)
        }

    const handleOnClose = () => {
        setSelectedWord(null)
        setSelectedIndex(null)
    }

    return (

        <div>
            <button
                className="toggle-words-button"
                type="button"
                onClick={handleToggleShow}
            >
                {
                    showWords ? 'Hide words' : 'Show words'
                }

            </button>

            {showWords && (
                <>
                    <div
                        className="words-grid"
                    >
                        {currentWords.map(item => (
                            <div
                                key={item.index}
                                className="frequency-word"
                                onClick={() => handleWordSelection(item)}
                            >
                                <span
                                    className="word-entry">
                                    <div
                                        className="word-index"
                                    >
                                        {item.index + 1}
                                    </div>

                                    <div
                                        className="word-spelling"
                                    >
                                        {item.word}
                                    </div>
                                </span>
                            </div>
                        ))}
                    </div>

                    {languageType == LanguageCodes.KOREAN && (
                        <div
                            className="korean-disclaimer"
                        >
                            *Frequency data for Korean from the
                            Leipzig Corpora Collection.
                        </div>
                    )}
                </>
            )}

            {showWords && (

                <PageControls
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    hasNextPage={indexOfLastWord < frequencyWords.length}
                />
            )}

            {selectedWord &&
                (selectedIndex !== null) && (

                    <WordInfoModal
                        selectedIndex={selectedIndex}
                        selectedWord={selectedWord}
                        onClose={handleOnClose}
                        wordInfoMap={wordInfoMap}
                    />
                )}
        </div >
    )
}

export default FrequencyDisplay