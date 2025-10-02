import { Router } from "express"
import * as cheerio from 'cheerio';
import axios from "axios"
import cors from 'cors'

interface WordInfo {
    ipa: string
    posList: string[]
    posMeaningMap: Record<string, string[][]>
}

const router = Router()
router.use(cors())

// gets the 200 most frequently used words for language
// router.get('/lookup/frequency', async (req, res) => {

//     const url =
//         'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/' +
//         'Norwegian_Bokmål_wordlist'

//     try {

//         const response = await axios.get(url)

//         if (response.status == 200) {

//             const frequencies: { index: number; word: string }[] = []

//             const $ = cheerio.load(response.data)

//             const wordList = $('ol').children()
//             wordList.each((index, word) => {
//                 if (index >= 201) return false

//                 const wordText = $(word).find('a').first().text()

//                 if (wordText !== "") {
//                     frequencies.push({ index, word: wordText })
//                 }
//             })

//             console.log(wordList.text())

//             // $('.Latn').each((index, word) => {
//             //     if (index >= 200) return false

//             //     const wordText = $(word).text()
//             //     frequencies.push({ index, word: wordText })
//             // })

//             res.json(frequencies)
//         }

//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ message: 'Server Error.' })
//     }
// })

// gets information for a word
router.get('/lookup/word', async (req, res) => {

    const word = req.query.inputWord
    const language = req.query.languageCode

    const url = `https://en.wiktionary.org/wiki/${word}`

    try {

        const response = await axios.get(url)

        if (response.status == 200) {

            const $ = cheerio.load(response.data)

            let languageHeader

            if (language === 'fr') {
                languageHeader = $('#French')
            } else if (language === 'pt') {
                languageHeader = $('#Portuguese')
            } else if (language === 'sp') {
                languageHeader = $('#Spanish')
            } else if (language === 'ro') {
                languageHeader = $('#Romanian')
            } else if (language === 'it') {
                languageHeader = $('#Italian')
            } else if (language === 'ko') {
                languageHeader = $('#Korean')
            } else if (language === 'da') {
                languageHeader = $('#Danish')
            } else {
                languageHeader = $('#Norwegian_Bokmål')
            }

            // ipa representation of word's pronunciation
            const ipa = languageHeader
                .parent()
                .nextAll()
                .find('[id^="Pronunciation"]')
                .parent()
                .next()
                .find('.IPA')
                .first()
                .parent()
            ipa.find('sup').remove()
            ipa
                .find('[title="Wiktionary:International Phonetic Alphabet"]')
                .remove()
            ipa.find('ul').remove()

            let ipaText = ipa.text()
            ipaText = ipaText.replace(/^: /, '')

            // list of parts of speech used in Wiktionary
            const posList = [
                'Adjective',
                'Adverb',
                'Article',
                'Conjunction',
                'Contraction',
                'Determiner',
                'Interjection',
                'Noun',
                'Numeral',
                'Particle',
                'Participle',
                'Preposition',
                'Postposition',
                'Pronoun',
                'Verb'
            ]

            const wordPosList: string[] = []

            const posMeaningMap: Record<string, string[][]> = {}

            // goes through all elements in French subsection
            languageHeader
                .parent()
                .nextAll()
                .each((_, element) => {
                    const $element = $(element)

                    // end loop if next language's subsection has started
                    if ($element.hasClass('mw-heading2')) return false

                    // element's text
                    const text = $element
                        .text()
                        .trim()

                    if (posList.some(pos => text.includes(pos))) {

                        const posMeanings = $element
                            .nextAll('ol')
                            .first()
                            .children('li')

                        let wordPos = $element.find('h3')

                        if (wordPos.text() === '') {
                            wordPos = $element.find('h4')
                        }

                        const posLabel = wordPos
                            .text()
                            .trim()
                            || 'Unknown'

                        const posMeaningList: string[][] = []


                        posMeanings.each((_, meaning) => {

                            const $meaning = $(meaning).clone()
                            $meaning.find('ul').remove()
                            $meaning.find('dl').remove()
                            $meaning.find('style').remove()

                            let fullText = $meaning.text().trim();

                            if (fullText.length > 0) {
                                posMeaningList.push([fullText]);
                            }
                        })

                        if (!posMeaningMap[posLabel]) {
                            posMeaningMap[posLabel] = []
                        }

                        posMeaningMap[posLabel].push(...posMeaningList)
                    }
                })

            const wordInfo: WordInfo = {
                ipa: ipaText,
                posList: wordPosList,
                posMeaningMap: posMeaningMap
            }

            res.json(wordInfo)

        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error.' })
    }
})

export default router