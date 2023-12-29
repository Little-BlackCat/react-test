import { useTranslation } from "react-i18next"

const Test3 = () => {
  const { t } = useTranslation()

  return (
    <div className="test">
      <h1>
        {t("desc3")}
      </h1>
    </div>
  )
}

export default Test3