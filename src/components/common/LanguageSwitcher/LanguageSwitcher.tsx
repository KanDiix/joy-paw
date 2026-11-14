import { useTranslation } from 'react-i18next';
import { type Language, SUPPORTED_LANGUAGES } from 'config/i18n/i18n';

export const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    // `resolvedLanguage` is always one of SUPPORTED_LANGUAGES (e.g. `fr-CA` resolves to `fr`).
    const currentLanguage = i18n.resolvedLanguage;

    const handleChange = (language: Language) => void i18n.changeLanguage(language);

    return (
        <select
            className="form-select form-select-sm w-auto"
            aria-label={t('layout.language.label')}
            value={currentLanguage}
            onChange={event => handleChange(event.target.value as Language)}
        >
            {SUPPORTED_LANGUAGES.map(language => (
                <option key={language} value={language}>
                    {t(`layout.language.${language}`)}
                </option>
            ))}
        </select>
    );
};
