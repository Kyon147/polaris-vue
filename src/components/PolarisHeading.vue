<template>
<dynamic-tag :tag="tag" class="Polaris-Heading" :class="['Polaris-Heading--' + variant]">
    <slot></slot>
</dynamic-tag>
</template>


<script>
import DynamicTag from './DynamicTag.vue';

export default {
    name: 'PolarisHeading',
    props: {
        tag: {
            type: String,
            default: 'h2'
        },
        variant: {
            type: String,
            default: 'default',
            validator(v) {
                return [
                    'default',
                    'headingLg',
                    'headingMd',
                    'headingSm',
                ].indexOf(v) !== -1;
            }
        }
    },
    components: {
        DynamicTag
    }
}
</script>
