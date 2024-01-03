import { Select } from 'antd';
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const Languages = () => {
  const { t, i18n } = useTranslation()
  const languageFromLocalStorage = localStorage.getItem("language") || 'en'
  const languageOptions = [
    { value: 'en', label: "langEn" },
    { value: 'th', label: "langTh" },
  ]

  async function onClickLanguagesChange (value: string) {
    await i18n.changeLanguage(value)
    localStorage.setItem("language", value)
    window.location.reload()
  }

  useEffect(() => {
    localStorage.setItem("language", languageFromLocalStorage);
    i18n.changeLanguage(languageFromLocalStorage)
  }, [languageFromLocalStorage])

  return (
    <div data-testid="languages" className="languages">
      <Select
        data-testid="languages-selected"
        defaultValue={languageFromLocalStorage}
        style={{ width: 120, textAlign: "left" }}
        onChange={onClickLanguagesChange}
      >
        {languageOptions.map((lang, index) => (
          <Select.Option
            data-testid={`languages-option-${lang.value}`}
            key={index} 
            value={lang.value}
          >
            {t(lang.label)}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

export default Languages;