<template>
<nav role="navigation">
    <polaris-unstyled-link
        v-if="breadcrumbAction"
        :url="breadcrumbAction.url"
        @click="handleAction(breadcrumbAction)"
        class="Polaris-Breadcrumbs__Breadcrumb">
        <span  class="Polaris-Breadcrumbs__Icon">
            <polaris-icon :source="chevronIcon"></polaris-icon>
        </span>
        {{ breadcrumbAction.content }}
    </polaris-unstyled-link>
</nav>
</template>

<script>
import PolarisUnstyledLink from './PolarisUnstyledLink.vue';
import PolarisIcon from './PolarisIcon.vue';
import chevronIcon from '../resources/chevron-icon.svg';

export default {
    props: {
        /**
         * This takes an array of actions, but only shows the last one in the array
         * for some reason.
         */
        breadcrumbs: {
            type: Array,
            default() {
                return [];
            }
        },
    },
    data() {
        return {
            chevronIcon: chevronIcon
        };
    },
    methods: {
        handleAction(action) {
            if (action.onAction) {
                action.onAction();
            }
        },
    },
    computed: {
        breadcrumbAction() {
            if (this.breadcrumbs.length < 1) {
                return null;
            }
            return this.breadcrumbs[this.breadcrumbs.length - 1];
        }
    }
};
</script>
<style>
    .Polaris-Breadcrumbs__Breadcrumb{
        cursor: pointer;
    }
</style>
