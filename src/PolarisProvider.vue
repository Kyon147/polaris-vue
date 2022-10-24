<template>

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
            app: app
        }
    },

    mounted(){
        this.app = createApp({
            apiKey: config.apiKey,
            host: config.host
        });
    }
}
</script>

<style scoped>

</style>
