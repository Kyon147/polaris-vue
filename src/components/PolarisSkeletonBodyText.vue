<template>
<div class="Polaris-SkeletonBodyTextContainer">
    <div
        v-for="i in lines"
        class="Polaris-SkeletonBodyText">
    </div>
</div>
</template>

<script>
export default {
    name: 'PolarisSkeletonBodyText',
    props: {
        lines: {
            type: Number,
            default: 3
        },
    },
}
</script>
