import { createContext, useContext } from "react"
import type { LanguageCodes } from "../types/languageNames"

interface LanguageContextType {
    languageType: LanguageCodes
    setLanguageType: React.Dispatch<React.SetStateAction<LanguageCodes>>
}

export const LanguageContext =
    createContext<LanguageContextType | undefined>(undefined)


export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error(
            'useLanguage must be used within a LanguageContextProvider'
        )
    }

    return context
}