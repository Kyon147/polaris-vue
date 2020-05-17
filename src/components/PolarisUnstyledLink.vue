<template>
<a :href="url"
   :target="external ? '_blank' : ''"
   :rel="external ? 'noopener noreferrer' : ''"
   data-polaris-unstyled="true"
   @click="onClick"
>
    <slot></slot>
</a>
</template>

<script>
export default {
    props: {
        url: String,
        external: Boolean,
    },
    methods: {
        onClick(e) {
            if (this.disabled) {
                return;
            }
            this.$emit('click', e);
        },
    }
}
</script>
