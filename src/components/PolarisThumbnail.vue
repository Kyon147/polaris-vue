<template>
<span :class="classes">
    <img v-if="!isSvg(source)" class="Polaris-Thumbnail__Image" :src="source" :alt="alt">
    <polaris-icon v-else :source="source" :alt="alt" />
</span>
</template>

<script>
import PolarisIcon from "./PolarisIcon";
import ComponentHelpers from '../ComponentHelpers.js';

export default {
    components: {PolarisIcon},

    props: {
        size: {
            type: String,
            default: 'medium',
            validator(v) {
                return [
                    'small',
                    'medium',
                    'large',
                ].indexOf(v) !== -1;
            }
        },
        source: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }
    },
    computed: {
        classes() {
            const classes = ComponentHelpers.makeComponentClass('Polaris-Thumbnail', [
                'size',
            ], this);
            classes['Polaris-Thumbnail--hasIcon'] = this.isSvg(this.source)
            console.log( 'class: ' , classes);
            return classes
        }
    },
    methods:{
        isSvg(source) {
            const isSVG = new RegExp(/(<svg)([^<]*|[^>]*)/);
            return isSVG.test(source);
        }
    }
};
</script>
