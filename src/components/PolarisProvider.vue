<template>
<div class="PolarisProvider">
    <slot></slot>
</div>
</template>


<script>
import createApp from '@shopify/app-bridge';
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
        }
    },

    data(){
        return{
            app: null
        }
    },

    provide() {
        return {
            useAppBridge: () => this.app
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
    }


};
</script>

<style scoped>

</style>
