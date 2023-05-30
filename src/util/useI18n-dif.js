import {inject} from 'vue';
import {I18n} from "./i18n/i18n";


export default function UseI18n(options) {
    const lang = inject('lang');
    const i18n = inject('i18n');
    debugger
    console.log( 'load I*' );

    if (options === null) {
        console.log( 'use simple' );
        return new I18n();
    } else {
        return useComplexI18n(options, manager);
    }
}

function useSimpleI18n(manager) {
    const i18n = new I18n([], manager.details);
    return [i18n];
}

function useComplexI18n({id, fallback, translations}) {
    let i18n;
    if (translations === null) {
        i18n = new I18n(translations);
    } else {
        i18n = new I18n(fallback);
    }
    return [i18n]
}
