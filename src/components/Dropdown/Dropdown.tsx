import React, { useState, useRef, useEffect } from 'react'
import type { LanguageCodes, LanguageNames } from '../../types/languageNames.ts'
import './Dropdown.css'


interface DropdownProps {
    options: { value: LanguageCodes, label: LanguageNames }[]
    onSelect: (value: LanguageCodes, label: LanguageNames) => void
    placeholder?: string
}

const Dropdown: React.FC<DropdownProps> =
    ({ options, onSelect, placeholder }) => {

        const [isOpen, setIsOpen] = useState<boolean>(false)
        const [selectedValue, setSelectedValue] =
            useState<LanguageCodes | null>(null)
        const dropdownRef = useRef<HTMLDivElement | null>(null)

        const handleToggle = () => {
            setIsOpen((prev) => !prev)
        }

        const handleSelect = (value: LanguageCodes, label: LanguageNames) => {
            setSelectedValue(value)
            onSelect(value, label)
            setIsOpen(false)
        }

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent): void => {
                if (dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)

            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }

        }, [])

        return (

            <div
                className='dropdown-container'
                ref={dropdownRef}
            >
                <button
                    type='button'
                    className='dropdown-button'
                    onClick={handleToggle}
                >
                    {selectedValue ?
                        (options.find(
                            opt => opt.value === selectedValue)?.label
                        ) : (
                            placeholder || "Select an option"
                        )
                    }
                </button>

                {isOpen && (
                    <ul
                        className='dropdown-menu'
                    >
                        {options.map(
                            (option) => (
                                <li
                                    key={option.value}
                                    onClick={() =>
                                        handleSelect(option.value,
                                            option.label)}
                                >
                                    {option.label}
                                </li>
                            )
                        )}
                    </ul>
                )}
            </div>
        )
    }

export default Dropdown
