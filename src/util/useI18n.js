import { inject } from 'vue';


export function UseI18n() {
    const lang = inject('lang');
    const i18n = inject('i18n');

    const translate = (
        id,
        replacements,
) => {
        if (!i18n) {
            throw new Error('i18n is not defined');
        }

        return i18n.translate(id, replacements);
    };

    return { translate };
}
