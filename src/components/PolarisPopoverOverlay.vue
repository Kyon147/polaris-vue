<template>
<polaris-positioned-overlay
    :id="id"
    :full-width="fullWidth"
    :active="active"
    :preferred-position="preferredPosition"
    :activator-id="activatorId"
    @scrollout="handleScrollOut">
    <template slot="overlay" slot-scope="props">
        <slot name="overlay" :data="props"></slot>
    </template>
</polaris-positioned-overlay>
</template>


<script>
import PolarisPositionedOverlay from './PolarisPositionedOverlay.vue';
export default {
    name: 'PolarisPopoverOverlay',
    components: {
        PolarisPositionedOverlay
    },
    props: {
        id: String,
        active: Boolean,
        preventAutofocus: Boolean,
        sectioned: Boolean,
        fullWidth: Boolean,
        preferredPosition: {
            type: String,
            default: 'below'
        },
        activatorId: String,
    },
    methods: {
        handleScrollOut() {
            this.$emit('scrollout');
        }
    }
}
</script>
