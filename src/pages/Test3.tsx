import { useTranslation } from "react-i18next"

const Test3 = () => {
  const { t } = useTranslation()

  return (
    <div>{t("desc3")}</div>
  )
}

export default Test3