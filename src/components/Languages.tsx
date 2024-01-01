import { Select } from 'antd';
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
// import { useAppDispatch } from '../store/store';
// import { useSelector } from 'react-redux';
// import { languageSelector } from '../store/slices/languageSlice';
// import { changeLanguage } from 'i18next';

const Languages = () => {
  const { t, i18n } = useTranslation()
  // const dispatch = useAppDispatch()
  // const languageReducer = useSelector(languageSelector)
  // const [language, setLanguage] = useState<string>(languageFromLocalStorage)
  // const languageOptions = languageReducer.languageOptions

  const languageFromLocalStorage = localStorage.getItem("language") || 'en'
  const languageOptions = [
    { value: 'en', label: "langEn" },
    { value: 'th', label: "langTh" },
  ]

  async function onClickLanguagesChange (value: string) {
    // dispatch(()=>changeLanguage(value))
    await i18n.changeLanguage(value)
    localStorage.setItem("language", value)
    window.location.reload()
  }

  useEffect(() => {
    localStorage.setItem("language", languageFromLocalStorage);
    i18n.changeLanguage(languageFromLocalStorage)
  }, [languageFromLocalStorage])

  return (
    <div className="languages">
      <Select
        defaultValue={languageFromLocalStorage}
        style={{ width: 120, textAlign: "left" }}
        onChange={onClickLanguagesChange}
        // options={languageOptions.map(lang => ({
        //   ...lang,
        //   label: t(lang.label)
        // }))}
      >
        {languageOptions.map((lang, index) => (
          <Select.Option key={index} value={lang.value}>{t(lang.label)}</Select.Option>
        ))}
      </Select>

      {/* <select
        className='dropdown' 
        onChange={(e) => onClickLanguagesChange(e.target.value)}
        value={languageFromLocalStorage}
      >
        {languagesOption.map((lang, index) => (
          <option key={index} value={lang.value}>{t(lang.label)}</option>
        ))}
      </select> */}
    </div>
  )
}

export default Languages;