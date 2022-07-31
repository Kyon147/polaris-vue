<template>
<div :class="className">
<template v-if="(size === 'extraLarge' || size === 'large') && variableHeight">
    <polaris-stack :vertical="true" spacing="tight" alignment="center">
        <polaris-stack-item>
            <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                <div :class="buttonStyleClassName">
                    {{ actionTitle }}
                </div>
            </template>
        </polaris-stack-item>
        <polaris-stack-item>
            <polaris-caption>
                <polaris-text-style variation="subdued">
                    {{ actionHint }}
                </polaris-text-style>
            </polaris-caption>
        </polaris-stack-item>
    </polaris-stack>
</template>
<template v-else-if="size === 'extraLarge'">
    <polaris-stack :vertical="true" alignment="center">
        <polaris-stack-item>
            <polaris-icon source="circleArrowUp" color="base" style="width: 40px; height: unset;"/>
        </polaris-stack-item>
        <polaris-stack-item>
            <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                <polaris-button :class="buttonStyleClassName" :disabled="disabled">
                    {{ actionTitle }}
                </polaris-button>
            </template>
        </polaris-stack-item>
        <polaris-stack-item>
            <polaris-text-style variation="subdued">
                {{ actionHint }}
            </polaris-text-style>
        </polaris-stack-item>
    </polaris-stack>
</template>
<template v-else-if="size === 'large'">
    <polaris-stack :vertical="true" spacing="tight" alignment="center">
        <polaris-stack-item>
            <polaris-icon source="circleChevronUp" color="base" style="width: 40px; height: unset;"/>
        </polaris-stack-item>
        <polaris-stack-item>
            <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                <div :class="buttonStyleClassName">
                    {{ actionTitle }}
                </div>
            </template>
        </polaris-stack-item>
        <polaris-stack-item>
            <polaris-caption>
                <polaris-text-style variation="subdued">
                    {{ actionHint }}
                </polaris-text-style>
            </polaris-caption>
        </polaris-stack-item>
    </polaris-stack>
</template>
</div>
</template>

<script>
import PolarisStack from "./PolarisStack";
import PolarisIcon from "./PolarisIcon";
import PolarisCaption from "./PolarisCaption";
import PolarisTextStyle from "./PolarisTextStyle";
import ComponentHelpers from "../ComponentHelpers";
import PolarisButton from "./PolarisButton";
export default {
    name: "PolarisFileUpload",
    components: {PolarisButton, PolarisIcon, PolarisTextStyle, PolarisCaption, PolarisStack},
    props: {
        actionTitle: {
            type: String,
        },
        actionHint: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: null
        },
        variableHeight: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            measuring: false,
            type: 'file',
            focused: false,
            allowMultiple: false,
        };
    },
    computed: {
        className() {
            return ComponentHelpers.classNames(
                'Polaris-DropZone-FileUpload',
                this.measuring && 'Polaris-DropZone--measuring',
                // this.size === 'small' && 'Polaris-DropZone-FileUpload__FileUploadSmallView',
            );
        },
        buttonStyleClassName() {
            return (this.size === 'extraLarge' || this.size === 'large') ?
                ComponentHelpers.classNames(
                    'Polaris-DropZone-FileUpload__Button',
                    (this.size && this.size !== 'extraLarge') && 'Polaris-DropZone-FileUpload--sizeSlim',
                    this.focused && 'Polaris-DropZone-FileUpload--focused',
                    this.disabled && 'Polaris-DropZone-FileUpload--disabled',
                ) : null;
        },
        actionTitleClassName() {
            return ComponentHelpers.classNames('Polaris-DropZone-FileUpload__ActionTitle',
                this.focused && !this.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--focused',
                this.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--disabled',
            );
        },
    },
}
</script>

<style scoped>

</style>
