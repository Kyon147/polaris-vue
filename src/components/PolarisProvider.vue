<template>
<div class="PolarisProvider">
    <slot></slot>
</div>
</template>


<script>
import createApp from '@shopify/app-bridge';
import {I18n} from "../util/i18n/i18n";
export default {
    name: "PolarisProvider",

    props:{
        config: {
            type: Object,
            default: () => {}
        },
        router:{
            type: Object,
            default: () => {}
        },
        i18n:{
            type: Object,
            default: () => {}
        }
    },

    data(){
        return{
            app: null,
        }
    },

    provide() {
        return {
            useAppBridge: () => this.app,
            i18n: () => this.i18nContext,
        }
    },

    created(){
        if (this.config && this.config.apiKey) {
            try {
                this.app = createApp({
                    apiKey: this.config.apiKey,
                    host: this.config.host,
                    forceRedirect: this.config.forceRedirect
                });
            } catch (e) {
                console.error(e)
            }
        }

        if(!this.config && this.config.apiKey){
            console.error('Api Key Missing for Provider to load AppBridge')
        }

        if(!this.config && this.config.host){
            console.error('Host param missing to initialise AppBridge')
        }
    },

    computed:{
        i18nContext(){
          return new I18n(this.i18n)
      }
    }


};
</script>

<style scoped>

</style>
