import React from "react"
import type { WordInfo } from "../../types/wordInfo"
import './PartOfSpeechMeaningTable.css'

interface Props {
    currentWordInfo: WordInfo
}

const PartOfSpeechMeaningTable: React.FC<Props> =
    ({ currentWordInfo }) => {

        const meaningByPos = currentWordInfo?.posMeaningMap || {}

        return (

            <table
                className="meanings-table"
            >
                <thead>
                    <tr>
                        <th>
                            Part of speech
                        </th>
                        <th>
                            Meanings
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(meaningByPos)
                        .map(([pos, meaningGroups], i) => (
                            <tr
                                key={i}
                            >
                                <td>
                                    {pos}
                                </td>
                                <td>
                                    <ol>
                                        {meaningGroups
                                            .map((group, j) => (
                                                <li
                                                    key={j}
                                                >
                                                    {group
                                                        .join('; ')
                                                    }
                                                </li>
                                            ))}
                                    </ol>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        )
    }

export default PartOfSpeechMeaningTable