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
            this.app = createApp({
                apiKey: this.config.apiKey,
                host: this.config.host,
                forceRedirect: this.config.forceRedirect
            });
        }
    }


};
</script>

<style scoped>

</style>
