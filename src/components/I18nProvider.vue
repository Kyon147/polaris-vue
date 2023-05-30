<template>
    <div class="PolarisI18nProvider">
        <slot></slot>
    </div>
</template>


<script>
export default {
    name: "PolarisI18nProvider",

    props: {
        locale: {
            type: Object,
            default: () => {
            }
        }
    },
};
</script>
