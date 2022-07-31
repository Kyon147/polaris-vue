<template>
<div :class="classes">
    <slot></slot>
</div>
</template>

<script>
export default {
    name:"PolarisStackItem",
    polarisName: 'StackItem',
    props: {
        fill: Boolean
    },
    computed: {
        classes() {
            return {
                'Polaris-Stack__Item': true,
                'Polaris-Stack__Item--fill': this.fill
            };
        }
    }
};
</script>
