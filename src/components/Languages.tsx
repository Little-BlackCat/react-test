import { Select } from 'antd';
import { useTranslation } from "react-i18next"

const Languages = () => {
  const { t, i18n } = useTranslation()
  let languagesOption = [
    { value: 'en', label: "langEn" },
    { value: 'th', label: "langTh" }
  ]

  function onClickLanguagesChange (value: string) {
    console.log(`Before select value: ${value}`)
    i18n.changeLanguage(value)
  }

  return (
    <div className="languages">
      {/* <Select
        defaultValue="en"
        style={{ width: 120, textAlign: "left" }}
        onChange={onClickLanguagesChange}
        options={languagesOption.map(( language ) => ({
          ...language,
          label: t(language.label)
        }))}
      /> */}

      <select
        className='dropdown' 
        onChange={(e) => onClickLanguagesChange(e.target.value)}
      >
        {languagesOption.map((lang) => (
          <option value={lang.value}>{t(lang.label)}</option>
        ))}
      </select>
    </div>
  )
}

export default Languages;