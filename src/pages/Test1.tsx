import { useTranslation } from "react-i18next"

const Test1 = () => {
  const { t } = useTranslation()

  return (
    <div>{t("desc1")}</div>
  )
}

export default Test1