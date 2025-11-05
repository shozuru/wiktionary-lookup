import * as Dialog from "@radix-ui/react-dialog"
import React, { useEffect, useState } from 'react'
import './WordInfoModel.css'
import type { WordInfo } from "../../types/wordInfo"
import PartOfSpeechMeaningTable
    from "../PartOfSpeechMeaningTable/PartOfSpeechMeaningTable"
import { useLanguage } from "../../context/LanguageContext"

interface WordInfoModalProps {
    selectedIndex: number
    selectedWord: string
    onClose: () => void
    wordInfoMap: Record<string, WordInfo>
}

const WordInfoModal: React.FC<WordInfoModalProps> =
    ({ selectedIndex, selectedWord, onClose, wordInfoMap }) => {

        const { languageType } = useLanguage()

        const [currentWordInfo, setCurrentWordInfo] =
            useState<WordInfo | null>(null)

        const fetchWordInfo = (input: string) => {

            if (input in wordInfoMap) {
                setCurrentWordInfo(wordInfoMap[input])
            } else {
                getInfoFromWiktionary(input)
                    .then((data) => {
                        setCurrentWordInfo(data)
                    })
            }
        }

        const getInfoFromWiktionary =
            async (input: string): Promise<WordInfo> => {

                const params = new URLSearchParams({
                    inputWord: input,
                    languageCode: languageType
                })

                const res =
                    await fetch(

                        'https://wiktionary-lookup.duckdns.org/lookup/word?' +
                        `${params.toString()}`
                    )

                const data: WordInfo = await res.json()

                if (!(data === null)) {
                    wordInfoMap[input] = data
                }

                return data

            }

        useEffect(() => {
            if (selectedWord) {
                fetchWordInfo(selectedWord)
            }
        }, [selectedWord])

        return (

            <Dialog.Root
                open={true}
                onOpenChange={onClose}
                modal={false}
            >
                <div
                    className="dialog-overlay"
                />

                <Dialog.Content
                    className="dialog-content"
                >
                    <Dialog.Title
                        className="dialog-title"
                    >
                        Selected word: {selectedWord}
                    </Dialog.Title>

                    <Dialog.Description
                        asChild
                    >
                        <div
                            className="dialog-description"
                        >
                            <h4
                                className="info-header"
                            >
                                Info:
                            </h4>

                            {currentWordInfo ? (

                                <div
                                    className="word-info"
                                >
                                    <div
                                        className="frequency"
                                    >
                                        Word frequency rank: {selectedIndex + 1}
                                    </div>

                                    <div
                                        className="fetched-data"
                                    >
                                        <p
                                            className="ipa-representation"
                                        >
                                            <span
                                                className="ipa-text"
                                            >
                                                IPA:
                                            </span>
                                            {currentWordInfo.ipa ? (
                                                <span>
                                                    {currentWordInfo.ipa}
                                                </span>
                                            ) : (
                                                <span
                                                    className="no-ipa-found"
                                                >
                                                    No IPA found.
                                                </span>
                                            )}

                                        </p>

                                        <PartOfSpeechMeaningTable
                                            currentWordInfo={currentWordInfo}
                                        />

                                    </div>

                                </div>

                            ) : (

                                <div
                                    className="info-loading"
                                >
                                    <span>
                                        Getting info from Wiktionary.
                                    </span>
                                    <span>
                                        Please wait...
                                    </span>
                                </div>
                            )}
                        </div>

                    </Dialog.Description>

                    <Dialog.Close
                        className="dialog-close"
                        onClick={onClose}
                    >
                        Close
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Root >
        )
    }

export default WordInfoModal