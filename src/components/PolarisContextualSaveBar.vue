<template>
    <div
        class="Polaris-Frame__ContextualSaveBar Polaris-Frame-CSSAnimation--startFade" :class="{
        'Polaris-Frame-CSSAnimation--endFade' : loaded
        }">
        <div p-color-scheme="dark" style="color: var(--p-text);">
            <div class="Polaris-Frame-ContextualSaveBar">
                <div class="Polaris-Frame-ContextualSaveBar__Contents" :class="{'Polaris-Frame-ContextualSaveBar--fullWidth' : fullWidth}">
                    <h2 class="Polaris-Frame-ContextualSaveBar__Message">
                        Unsaved changes
                    </h2>
                    <div class="Polaris-Frame-ContextualSaveBar__ActionContainer">
                        <polaris-stack spacing="tight" :wrap="false">
                            <polaris-stack-item>
                                <polaris-button
                                    outline
                                    @click="handleAction(discardAction)"
                                >
                                    Discard
                                </polaris-button>
                            </polaris-stack-item>
                            <polaris-stack-item>
                                <polaris-button
                                    primary
                                    @click="handleAction(saveAction)">
                                    Save
                                </polaris-button>
                            </polaris-stack-item>
                        </polaris-stack>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PolarisButton from "./PolarisButton";
import PolarisStack from "./PolarisStack";
import PolarisStackItem from "./PolarisStackItem";

export default {
    name: "PolarisContextualSaveBar",
    components: {PolarisStackItem, PolarisStack, PolarisButton},
    props: {
        alignContentFlush: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: "Unsaved changes"
        },
        saveAction: {
            type: Object,
        },
        discardAction: {
            type: Object
        },
        fullWidth: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loaded: false,
        }
    },
    mounted() {
        setTimeout(() => {
            this.loaded = true
        }, 200)
    },
    methods: {
        handleAction(action) {
            console.log('handleAction', action);
            if (action.onAction) {
                action.onAction();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.Polaris-Frame {
    &__ContextualSaveBar {
        width: 100%;
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;

        --p-frame-offset: 0rem;
        --p-duration-0: 0ms;
        --p-duration-50: 50ms;
        --p-duration-100: 100ms;
        --p-duration-150: 150ms;
        --p-duration-200: 200ms;
        --p-duration-250: 250ms;
        --p-duration-300: 300ms;
        --p-duration-350: 350ms;
        --p-duration-400: 400ms;
        --p-duration-450: 450ms;
        --p-duration-500: 500ms;
        --p-duration-5000: 5000ms;
        --p-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
        --p-ease-in: cubic-bezier(0.42, 0, 1, 1);
        --p-ease-out: cubic-bezier(0, 0, 0.58, 1);
        --p-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
        --p-linear: cubic-bezier(0, 0, 1, 1);
        --p-keyframes-bounce: p-keyframes-bounce;
        --p-keyframes-fade-in: p-keyframes-fade-in;
        --p-keyframes-pulse: p-keyframes-pulse;
        --p-keyframes-spin: p-keyframes-spin;
    }

    &-ContextualSaveBar {
        display: flex;
        height: 3.5rem;
        min-height: 56px;
        background: var(--p-surface);
        box-shadow: 0 0.125rem 0.25rem var(--p-hint-from-direct-light);

        &__Contents {

            display: flex;
            flex: 1 1 auto;
            align-items: center;
            justify-content: space-between;
            min-width: 0.0625rem;
            max-width: 62.375rem;
            height: 100%;
            margin: 0 auto;
            padding: 0 var(--p-space-4);

            @media (min-width: 46.5em) {
                .Polaris-Frame-ContextualSaveBar__Contents {
                    padding: 0 var(--p-space-8);
                }
            }
            @media (min-width: 30.625em) {
                .Polaris-Frame-ContextualSaveBar__Contents {
                    padding: 0 var(--p-space-5);
                }
            }
        }

        &--fullWidth{
            max-width: none;
            padding: 0 var(--p-space-4);
        }
    }
}

.Polaris-Frame-CSSAnimation--startFade {
    opacity: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    will-change: opacity;
    transition: opacity var(--p-duration-300) var(--p-ease-out);
    pointer-events: none;
}

.Polaris-Frame-CSSAnimation--endFade {
    opacity: 1;
    pointer-events: auto;
}

.Polaris-Button.Polaris-Button--outline {
    color: var(--p-text);
    border: var(--p-border-width-1) solid var(--p-border-neutral-subdued);

    &:hover {
        background: var(--p-action-secondary-hovered);
        outline: var(--p-border-width-1) solid transparent;
    }
}

[p-color-scheme="light"] {
    color-scheme: light;
    --p-background: rgba(246, 246, 247, 1);
    --p-background-hovered: rgba(241, 242, 243, 1);
    --p-background-pressed: rgba(237, 238, 239, 1);
    --p-background-selected: rgba(237, 238, 239, 1);
    --p-surface: rgba(255, 255, 255, 1);
    --p-surface-neutral: rgba(228, 229, 231, 1);
    --p-surface-neutral-hovered: rgba(219, 221, 223, 1);
    --p-surface-neutral-pressed: rgba(201, 204, 208, 1);
    --p-surface-neutral-disabled: rgba(241, 242, 243, 1);
    --p-surface-neutral-subdued: rgba(246, 246, 247, 1);
    --p-surface-subdued: rgba(250, 251, 251, 1);
    --p-surface-disabled: rgba(250, 251, 251, 1);
    --p-surface-hovered: rgba(246, 246, 247, 1);
    --p-surface-pressed: rgba(241, 242, 243, 1);
    --p-surface-depressed: rgba(237, 238, 239, 1);
    --p-surface-search-field: rgba(241, 242, 243, 1);
    --p-backdrop: rgba(0, 0, 0, 0.5);
    --p-overlay: rgba(255, 255, 255, 0.5);
    --p-shadow-color-picker: rgba(0, 0, 0, 0.5);
    --p-shadow-color-picker-dragger: rgba(33, 43, 54, 0.32);
    --p-hint-from-direct-light: rgba(0, 0, 0, 0.15);
    --p-border: rgba(140, 145, 150, 1);
    --p-border-neutral-subdued: rgba(186, 191, 195, 1);
    --p-border-hovered: rgba(153, 158, 164, 1);
    --p-border-disabled: rgba(210, 213, 216, 1);
    --p-border-subdued: rgba(201, 204, 207, 1);
    --p-border-depressed: rgba(87, 89, 89, 1);
    --p-border-shadow: rgba(174, 180, 185, 1);
    --p-border-shadow-subdued: rgba(186, 191, 196, 1);
    --p-divider: rgba(225, 227, 229, 1);
    --p-icon: rgba(92, 95, 98, 1);
    --p-icon-hovered: rgba(26, 28, 29, 1);
    --p-icon-pressed: rgba(68, 71, 74, 1);
    --p-icon-disabled: rgba(186, 190, 195, 1);
    --p-icon-subdued: rgba(140, 145, 150, 1);
    --p-text: rgba(32, 34, 35, 1);
    --p-text-disabled: rgba(140, 145, 150, 1);
    --p-text-subdued: rgba(109, 113, 117, 1);
    --p-interactive: rgba(44, 110, 203, 1);
    --p-interactive-disabled: rgba(189, 193, 204, 1);
    --p-interactive-hovered: rgba(31, 81, 153, 1);
    --p-interactive-pressed: rgba(16, 50, 98, 1);
    --p-focused: rgba(69, 143, 255, 1);
    --p-surface-selected: rgba(242, 247, 254, 1);
    --p-surface-selected-hovered: rgba(237, 244, 254, 1);
    --p-surface-selected-pressed: rgba(229, 239, 253, 1);
    --p-icon-on-interactive: rgba(255, 255, 255, 1);
    --p-text-on-interactive: rgba(255, 255, 255, 1);
    --p-action-secondary: rgba(255, 255, 255, 1);
    --p-action-secondary-disabled: rgba(255, 255, 255, 1);
    --p-action-secondary-hovered: rgba(246, 246, 247, 1);
    --p-action-secondary-pressed: rgba(241, 242, 243, 1);
    --p-action-secondary-depressed: rgba(109, 113, 117, 1);
    --p-action-primary: rgba(0, 128, 96, 1);
    --p-action-primary-disabled: rgba(241, 241, 241, 1);
    --p-action-primary-hovered: rgba(0, 110, 82, 1);
    --p-action-primary-pressed: rgba(0, 94, 70, 1);
    --p-action-primary-depressed: rgba(0, 61, 44, 1);
    --p-icon-on-primary: rgba(255, 255, 255, 1);
    --p-text-on-primary: rgba(255, 255, 255, 1);
    --p-text-primary: rgba(0, 123, 92, 1);
    --p-text-primary-hovered: rgba(0, 108, 80, 1);
    --p-text-primary-pressed: rgba(0, 92, 68, 1);
    --p-surface-primary-selected: rgba(241, 248, 245, 1);
    --p-surface-primary-selected-hovered: rgba(179, 208, 195, 1);
    --p-surface-primary-selected-pressed: rgba(162, 188, 176, 1);
    --p-border-critical: rgba(253, 87, 73, 1);
    --p-border-critical-subdued: rgba(224, 179, 178, 1);
    --p-border-critical-disabled: rgba(255, 167, 163, 1);
    --p-icon-critical: rgba(215, 44, 13, 1);
    --p-surface-critical: rgba(254, 211, 209, 1);
    --p-surface-critical-subdued: rgba(255, 244, 244, 1);
    --p-surface-critical-subdued-hovered: rgba(255, 240, 240, 1);
    --p-surface-critical-subdued-pressed: rgba(255, 233, 232, 1);
    --p-surface-critical-subdued-depressed: rgba(254, 188, 185, 1);
    --p-text-critical: rgba(215, 44, 13, 1);
    --p-action-critical: rgba(216, 44, 13, 1);
    --p-action-critical-disabled: rgba(241, 241, 241, 1);
    --p-action-critical-hovered: rgba(188, 34, 0, 1);
    --p-action-critical-pressed: rgba(162, 27, 0, 1);
    --p-action-critical-depressed: rgba(108, 15, 0, 1);
    --p-icon-on-critical: rgba(255, 255, 255, 1);
    --p-text-on-critical: rgba(255, 255, 255, 1);
    --p-interactive-critical: rgba(216, 44, 13, 1);
    --p-interactive-critical-disabled: rgba(253, 147, 141, 1);
    --p-interactive-critical-hovered: rgba(205, 41, 12, 1);
    --p-interactive-critical-pressed: rgba(103, 15, 3, 1);
    --p-border-warning: rgba(185, 137, 0, 1);
    --p-border-warning-subdued: rgba(225, 184, 120, 1);
    --p-icon-warning: rgba(185, 137, 0, 1);
    --p-surface-warning: rgba(255, 215, 157, 1);
    --p-surface-warning-subdued: rgba(255, 245, 234, 1);
    --p-surface-warning-subdued-hovered: rgba(255, 242, 226, 1);
    --p-surface-warning-subdued-pressed: rgba(255, 235, 211, 1);
    --p-text-warning: rgba(145, 106, 0, 1);
    --p-border-highlight: rgba(68, 157, 167, 1);
    --p-border-highlight-subdued: rgba(152, 198, 205, 1);
    --p-icon-highlight: rgba(0, 160, 172, 1);
    --p-surface-highlight: rgba(164, 232, 242, 1);
    --p-surface-highlight-subdued: rgba(235, 249, 252, 1);
    --p-surface-highlight-subdued-hovered: rgba(228, 247, 250, 1);
    --p-surface-highlight-subdued-pressed: rgba(213, 243, 248, 1);
    --p-text-highlight: rgba(52, 124, 132, 1);
    --p-border-success: rgba(0, 164, 124, 1);
    --p-border-success-subdued: rgba(149, 201, 180, 1);
    --p-icon-success: rgba(0, 127, 95, 1);
    --p-surface-success: rgba(174, 233, 209, 1);
    --p-surface-success-subdued: rgba(241, 248, 245, 1);
    --p-surface-success-subdued-hovered: rgba(236, 246, 241, 1);
    --p-surface-success-subdued-pressed: rgba(226, 241, 234, 1);
    --p-text-success: rgba(0, 128, 96, 1);
    --p-icon-attention: rgba(138, 97, 22);
    --p-surface-attention: rgba(255, 234, 138);
    --p-decorative-one-icon: rgba(126, 87, 0, 1);
    --p-decorative-one-surface: rgba(255, 201, 107, 1);
    --p-decorative-one-text: rgba(61, 40, 0, 1);
    --p-decorative-two-icon: rgba(175, 41, 78, 1);
    --p-decorative-two-surface: rgba(255, 196, 176, 1);
    --p-decorative-two-text: rgba(73, 11, 28, 1);
    --p-decorative-three-icon: rgba(0, 109, 65, 1);
    --p-decorative-three-surface: rgba(146, 230, 181, 1);
    --p-decorative-three-text: rgba(0, 47, 25, 1);
    --p-decorative-four-icon: rgba(0, 106, 104, 1);
    --p-decorative-four-surface: rgba(145, 224, 214, 1);
    --p-decorative-four-text: rgba(0, 45, 45, 1);
    --p-decorative-five-icon: rgba(174, 43, 76, 1);
    --p-decorative-five-surface: rgba(253, 201, 208, 1);
    --p-decorative-five-text: rgba(79, 14, 31, 1);
    --p-breakpoints-xs: 0rem;
    --p-breakpoints-sm: 30.625rem;
    --p-breakpoints-md: 48rem;
    --p-breakpoints-lg: 65rem;
    --p-breakpoints-xl: 90rem;
    --p-shadow-transparent: 0 0 0 0 transparent;
    --p-shadow-faint: 0 0.0625rem 0 0 rgba(22, 29, 37, 0.05);
    --p-shadow-base: 0 0 0 0.0625rem rgba(63, 63, 68, 0.05), 0 0.0625rem 0.1875rem 0 rgba(63, 63, 68, 0.15);
    --p-shadow-deep: 0 0 0 0.0625rem rgba(6, 44, 82, 0.1), 0 0.125rem 1rem rgba(33, 43, 54, 0.08);
    --p-shadow-button: 0 0.0625rem 0 rgba(0, 0, 0, 0.05);
    --p-shadow-top-bar: 0 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.15);
    --p-shadow-card: 0 0 0.3125rem rgba(23, 24, 24, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15);
    --p-shadow-popover: -0.0625rem 0 1.25rem rgba(23, 24, 24, 0.05), 0 0.0625rem 0.3125rem rgba(0, 0, 0, 0.15);
    --p-shadow-layer: 0 1.9375rem 2.5625rem 0 rgba(32, 42, 53, 0.2), 0 0.125rem 1rem 0 rgba(32, 42, 54, 0.08);
    --p-shadow-modal: 0 1.625rem 5rem rgba(0, 0, 0, 0.2), 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    --p-shadows-inset-button: inset 0 -0.0625rem 0 rgba(0, 0, 0, 0.2);
    --p-shadows-inset-button-pressed: inset 0 0.0625rem 0 rgba(0, 0, 0, 0.15);
    --p-override-loading-z-index: 514;
    --p-choice-size: 1.25rem;
    --p-icon-size-small: 0.625rem;
    --p-icon-size-medium: 1.25rem;
    --p-choice-margin: 0.0625rem;
    --p-control-border-width: 0.125rem;
    --p-banner-border-default: inset 0 0.0625rem 0 0 var(--p-border-neutral-subdued), inset 0 0 0 0.0625rem var(--p-border-neutral-subdued);
    --p-banner-border-success: inset 0 0.0625rem 0 0 var(--p-border-success-subdued), inset 0 0 0 0.0625rem var(--p-border-success-subdued);
    --p-banner-border-highlight: inset 0 0.0625rem 0 0 var(--p-border-highlight-subdued), inset 0 0 0 0.0625rem var(--p-border-highlight-subdued);
    --p-banner-border-warning: inset 0 0.0625rem 0 0 var(--p-border-warning-subdued), inset 0 0 0 0.0625rem var(--p-border-warning-subdued);
    --p-banner-border-critical: inset 0 0.0625rem 0 0 var(--p-border-critical-subdued), inset 0 0 0 0.0625rem var(--p-border-critical-subdued);
    --p-thin-border-subdued: 0.0625rem solid var(--p-border-subdued);
    --p-text-field-spinner-offset: 0.125rem;
    --p-text-field-focus-ring-offset: -0.25rem;
    --p-button-group-item-spacing: -0.0625rem;
    --p-range-slider-thumb-size-base: 1rem;
    --p-range-slider-thumb-size-active: 1.5rem;
    --p-frame-offset: 0rem;
    --p-duration-0: 0ms;
    --p-duration-50: 50ms;
    --p-duration-100: 100ms;
    --p-duration-150: 150ms;
    --p-duration-200: 200ms;
    --p-duration-250: 250ms;
    --p-duration-300: 300ms;
    --p-duration-350: 350ms;
    --p-duration-400: 400ms;
    --p-duration-450: 450ms;
    --p-duration-500: 500ms;
    --p-duration-5000: 5000ms;
    --p-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
    --p-ease-in: cubic-bezier(0.42, 0, 1, 1);
    --p-ease-out: cubic-bezier(0, 0, 0.58, 1);
    --p-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
    --p-linear: cubic-bezier(0, 0, 1, 1);
    --p-keyframes-bounce: p-keyframes-bounce;
    --p-keyframes-fade-in: p-keyframes-fade-in;
    --p-keyframes-pulse: p-keyframes-pulse;
    --p-keyframes-spin: p-keyframes-spin;
    --p-border-radius-05: 0.125rem;
    --p-border-radius-1: 0.25rem;
    --p-border-radius-2: 0.5rem;
    --p-border-radius-3: 0.75rem;
    --p-border-radius-4: 1rem;
    --p-border-radius-5: 1.25rem;
    --p-border-radius-6: 1.875rem;
    --p-border-radius-base: 0.1875rem;
    --p-border-radius-large: 0.375rem;
    --p-border-radius-half: 50%;
    --p-border-width-1: 0.0625rem;
    --p-border-width-2: 0.125rem;
    --p-border-width-3: 0.1875rem;
    --p-border-width-4: 0.25rem;
    --p-border-width-5: 0.3125rem;
    --p-border-base: var(--p-border-width-1) solid var(--p-border-subdued);
    --p-border-dark: var(--p-border-width-1) solid var(--p-border);
    --p-border-transparent: var(--p-border-width-1) solid transparent;
    --p-border-divider: var(--p-border-width-1) solid var(--p-divider);
    --p-space-0: 0;
    --p-space-025: 0.0625rem;
    --p-space-05: 0.125rem;
    --p-space-1: 0.25rem;
    --p-space-2: 0.5rem;
    --p-space-3: 0.75rem;
    --p-space-4: 1rem;
    --p-space-5: 1.25rem;
    --p-space-6: 1.5rem;
    --p-space-8: 2rem;
    --p-space-10: 2.5rem;
    --p-space-12: 3rem;
    --p-space-16: 4rem;
    --p-space-20: 5rem;
    --p-space-24: 6rem;
    --p-space-28: 7rem;
    --p-space-32: 8rem;
    --p-font-family-sans: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    --p-font-family-mono: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    --p-font-size-1: 0.75rem;
    --p-font-size-2: 0.8125rem;
    --p-font-size-3: 0.875rem;
    --p-font-size-4: 0.9375rem;
    --p-font-size-5: 1rem;
    --p-font-size-6: 1.0625rem;
    --p-font-size-7: 1.25rem;
    --p-font-size-8: 1.3125rem;
    --p-font-size-9: 1.5rem;
    --p-font-size-10: 1.625rem;
    --p-font-size-11: 1.6875rem;
    --p-font-size-12: 1.75rem;
    --p-font-size-13: 2.625rem;
    --p-font-weight-regular: 400;
    --p-font-weight-medium: 500;
    --p-font-weight-semibold: 600;
    --p-font-weight-bold: 700;
    --p-line-height-1: 1rem;
    --p-line-height-2: 1.25rem;
    --p-line-height-3: 1.5rem;
    --p-line-height-4: 1.75rem;
    --p-line-height-5: 2rem;
    --p-line-height-6: 2.25rem;
    --p-line-height-7: 2.75rem;
    --p-z-1: 100;
    --p-z-2: 400;
    --p-z-3: 510;
    --p-z-4: 512;
    --p-z-5: 513;
    --p-z-6: 514;
    --p-z-7: 515;
    --p-z-8: 516;
    --p-z-9: 517;
    --p-z-10: 518;
    --p-z-11: 519;
    --p-z-12: 520;
}

[p-color-scheme="dark"] {
    color-scheme: dark;
    --p-background: rgba(11, 12, 13, 1);
    --p-background-hovered: rgba(11, 12, 13, 1);
    --p-background-pressed: rgba(11, 12, 13, 1);
    --p-background-selected: rgba(11, 12, 13, 1);
    --p-surface: rgba(32, 33, 35, 1);
    --p-surface-neutral: rgba(49, 51, 53, 1);
    --p-surface-neutral-hovered: rgba(49, 51, 53, 1);
    --p-surface-neutral-pressed: rgba(49, 51, 53, 1);
    --p-surface-neutral-disabled: rgba(49, 51, 53, 1);
    --p-surface-neutral-subdued: rgba(68, 71, 74, 1);
    --p-surface-subdued: rgba(26, 28, 29, 1);
    --p-surface-disabled: rgba(26, 28, 29, 1);
    --p-surface-hovered: rgba(47, 49, 51, 1);
    --p-surface-pressed: rgba(62, 64, 67, 1);
    --p-surface-depressed: rgba(80, 83, 86, 1);
    --p-surface-search-field: rgba(47, 49, 51, 1);
    --p-backdrop: rgba(0, 0, 0, 0.5);
    --p-overlay: rgba(33, 33, 33, 0.5);
    --p-shadow-color-picker: rgba(0, 0, 0, 0);
    --p-shadow-color-picker-dragger: rgba(0, 0, 0, 0);
    --p-hint-from-direct-light: rgba(185, 185, 185, 0.2);
    --p-border: rgba(80, 83, 86, 1);
    --p-border-neutral-subdued: rgba(130, 135, 139, 1);
    --p-border-hovered: rgba(80, 83, 86, 1);
    --p-border-disabled: rgba(103, 107, 111, 1);
    --p-border-subdued: rgba(130, 135, 139, 1);
    --p-border-depressed: rgba(142, 145, 145, 1);
    --p-border-shadow: rgba(91, 95, 98, 1);
    --p-border-shadow-subdued: rgba(130, 135, 139, 1);
    --p-divider: rgba(69, 71, 73, 1);
    --p-icon: rgba(166, 172, 178, 1);
    --p-icon-hovered: rgba(225, 227, 229, 1);
    --p-icon-pressed: rgba(166, 172, 178, 1);
    --p-icon-disabled: rgba(84, 87, 90, 1);
    --p-icon-subdued: rgba(120, 125, 129, 1);
    --p-text: rgba(227, 229, 231, 1);
    --p-text-disabled: rgba(111, 115, 119, 1);
    --p-text-subdued: rgba(153, 159, 164, 1);
    --p-interactive: rgba(54, 163, 255, 1);
    --p-interactive-disabled: rgba(38, 98, 182, 1);
    --p-interactive-hovered: rgba(103, 175, 255, 1);
    --p-interactive-pressed: rgba(136, 188, 255, 1);
    --p-focused: rgba(38, 98, 182, 1);
    --p-surface-selected: rgba(2, 14, 35, 1);
    --p-surface-selected-hovered: rgba(7, 29, 61, 1);
    --p-surface-selected-pressed: rgba(13, 43, 86, 1);
    --p-icon-on-interactive: rgba(255, 255, 255, 1);
    --p-text-on-interactive: rgba(255, 255, 255, 1);
    --p-action-secondary: rgba(77, 80, 83, 1);
    --p-action-secondary-disabled: rgba(32, 34, 35, 1);
    --p-action-secondary-hovered: rgba(84, 87, 91, 1);
    --p-action-secondary-pressed: rgba(96, 100, 103, 1);
    --p-action-secondary-depressed: rgba(123, 127, 132, 1);
    --p-action-primary: rgba(0, 128, 96, 1);
    --p-action-primary-disabled: rgba(0, 86, 64, 1);
    --p-action-primary-hovered: rgba(0, 150, 113, 1);
    --p-action-primary-pressed: rgba(0, 164, 124, 1);
    --p-action-primary-depressed: rgba(0, 179, 136, 1);
    --p-icon-on-primary: rgba(230, 255, 244, 1);
    --p-text-on-primary: rgba(255, 255, 255, 1);
    --p-text-primary: rgba(0, 141, 106, 1);
    --p-text-primary-hovered: rgba(0, 158, 120, 1);
    --p-text-primary-pressed: rgba(0, 176, 133, 1);
    --p-surface-primary-selected: rgba(12, 18, 16, 1);
    --p-surface-primary-selected-hovered: rgba(40, 48, 44, 1);
    --p-surface-primary-selected-pressed: rgba(54, 64, 59, 1);
    --p-border-critical: rgba(227, 47, 14, 1);
    --p-border-critical-subdued: rgba(227, 47, 14, 1);
    --p-border-critical-disabled: rgba(131, 23, 4, 1);
    --p-icon-critical: rgba(218, 45, 13, 1);
    --p-surface-critical: rgba(69, 7, 1, 1);
    --p-surface-critical-subdued: rgba(69, 7, 1, 1);
    --p-surface-critical-subdued-hovered: rgba(68, 23, 20, 1);
    --p-surface-critical-subdued-pressed: rgba(107, 16, 3, 1);
    --p-surface-critical-subdued-depressed: rgba(135, 24, 5, 1);
    --p-text-critical: rgba(233, 128, 122, 1);
    --p-action-critical: rgba(205, 41, 12, 1);
    --p-action-critical-disabled: rgba(187, 37, 10, 1);
    --p-action-critical-hovered: rgba(227, 47, 14, 1);
    --p-action-critical-pressed: rgba(250, 53, 17, 1);
    --p-action-critical-depressed: rgba(253, 87, 73, 1);
    --p-icon-on-critical: rgba(255, 248, 247, 1);
    --p-text-on-critical: rgba(255, 255, 255, 1);
    --p-interactive-critical: rgba(253, 114, 106, 1);
    --p-interactive-critical-disabled: rgba(254, 172, 168, 1);
    --p-interactive-critical-hovered: rgba(253, 138, 132, 1);
    --p-interactive-critical-pressed: rgba(253, 159, 155, 1);
    --p-border-warning: rgba(153, 112, 0, 1);
    --p-border-warning-subdued: rgba(153, 112, 0, 1);
    --p-icon-warning: rgba(104, 75, 0, 1);
    --p-surface-warning: rgba(153, 112, 0, 1);
    --p-surface-warning-subdued: rgba(77, 59, 29, 1);
    --p-surface-warning-subdued-hovered: rgba(82, 63, 32, 1);
    --p-surface-warning-subdued-pressed: rgba(87, 67, 34, 1);
    --p-text-warning: rgba(202, 149, 0, 1);
    --p-border-highlight: rgba(68, 157, 167, 1);
    --p-border-highlight-subdued: rgba(68, 157, 167, 1);
    --p-icon-highlight: rgba(44, 108, 115, 1);
    --p-surface-highlight: rgba(0, 105, 113, 1);
    --p-surface-highlight-subdued: rgba(18, 53, 57, 1);
    --p-surface-highlight-subdued-hovered: rgba(20, 58, 62, 1);
    --p-surface-highlight-subdued-pressed: rgba(24, 65, 70, 1);
    --p-text-highlight: rgba(162, 239, 250, 1);
    --p-border-success: rgba(0, 135, 102, 1);
    --p-border-success-subdued: rgba(0, 135, 102, 1);
    --p-icon-success: rgba(0, 94, 70, 1);
    --p-surface-success: rgba(0, 94, 70, 1);
    --p-surface-success-subdued: rgba(28, 53, 44, 1);
    --p-surface-success-subdued-hovered: rgba(31, 58, 48, 1);
    --p-surface-success-subdued-pressed: rgba(35, 65, 54, 1);
    --p-text-success: rgba(88, 173, 142, 1);
    --p-icon-attention: rgba(138, 97, 22);
    --p-surface-attention: rgba(255, 234, 138);
    --p-decorative-one-icon: rgba(255, 186, 67, 1);
    --p-decorative-one-surface: rgba(142, 102, 9, 1);
    --p-decorative-one-text: rgba(255, 255, 255, 1);
    --p-decorative-two-icon: rgba(245, 182, 192, 1);
    --p-decorative-two-surface: rgba(206, 88, 20, 1);
    --p-decorative-two-text: rgba(255, 255, 255, 1);
    --p-decorative-three-icon: rgba(0, 227, 141, 1);
    --p-decorative-three-surface: rgba(0, 124, 90, 1);
    --p-decorative-three-text: rgba(255, 255, 255, 1);
    --p-decorative-four-icon: rgba(0, 221, 218, 1);
    --p-decorative-four-surface: rgba(22, 124, 121, 1);
    --p-decorative-four-text: rgba(255, 255, 255, 1);
    --p-decorative-five-icon: rgba(244, 183, 191, 1);
    --p-decorative-five-surface: rgba(194, 51, 86, 1);
    --p-decorative-five-text: rgba(255, 255, 255, 1);
    --p-breakpoints-xs: 0rem;
    --p-breakpoints-sm: 30.625rem;
    --p-breakpoints-md: 48rem;
    --p-breakpoints-lg: 65rem;
    --p-breakpoints-xl: 90rem;
    --p-shadow-transparent: 0 0 0 0 transparent;
    --p-shadow-faint: 0 0.0625rem 0 0 rgba(22, 29, 37, 0.05);
    --p-shadow-base: 0 0 0 0.0625rem rgba(63, 63, 68, 0.05), 0 0.0625rem 0.1875rem 0 rgba(63, 63, 68, 0.15);
    --p-shadow-deep: 0 0 0 0.0625rem rgba(6, 44, 82, 0.1), 0 0.125rem 1rem rgba(33, 43, 54, 0.08);
    --p-shadow-button: 0 0.0625rem 0 rgba(0, 0, 0, 0.05);
    --p-shadow-top-bar: 0 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.15);
    --p-shadow-card: 0 0 0.3125rem rgba(23, 24, 24, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15);
    --p-shadow-popover: -0.0625rem 0 1.25rem rgba(23, 24, 24, 0.05), 0 0.0625rem 0.3125rem rgba(0, 0, 0, 0.15);
    --p-shadow-layer: 0 1.9375rem 2.5625rem 0 rgba(32, 42, 53, 0.2), 0 0.125rem 1rem 0 rgba(32, 42, 54, 0.08);
    --p-shadow-modal: 0 1.625rem 5rem rgba(0, 0, 0, 0.2), 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    --p-shadows-inset-button: inset 0 -0.0625rem 0 rgba(0, 0, 0, 0.2);
    --p-shadows-inset-button-pressed: inset 0 0.0625rem 0 rgba(0, 0, 0, 0.15);
    --p-override-loading-z-index: 514;
    --p-choice-size: 1.25rem;
    --p-icon-size-small: 0.625rem;
    --p-icon-size-medium: 1.25rem;
    --p-choice-margin: 0.0625rem;
    --p-control-border-width: 0.125rem;
    --p-banner-border-default: inset 0 0.0625rem 0 0 var(--p-border-neutral-subdued), inset 0 0 0 0.0625rem var(--p-border-neutral-subdued);
    --p-banner-border-success: inset 0 0.0625rem 0 0 var(--p-border-success-subdued), inset 0 0 0 0.0625rem var(--p-border-success-subdued);
    --p-banner-border-highlight: inset 0 0.0625rem 0 0 var(--p-border-highlight-subdued), inset 0 0 0 0.0625rem var(--p-border-highlight-subdued);
    --p-banner-border-warning: inset 0 0.0625rem 0 0 var(--p-border-warning-subdued), inset 0 0 0 0.0625rem var(--p-border-warning-subdued);
    --p-banner-border-critical: inset 0 0.0625rem 0 0 var(--p-border-critical-subdued), inset 0 0 0 0.0625rem var(--p-border-critical-subdued);
    --p-thin-border-subdued: 0.0625rem solid var(--p-border-subdued);
    --p-text-field-spinner-offset: 0.125rem;
    --p-text-field-focus-ring-offset: -0.25rem;
    --p-button-group-item-spacing: -0.0625rem;
    --p-range-slider-thumb-size-base: 1rem;
    --p-range-slider-thumb-size-active: 1.5rem;
    --p-frame-offset: 0rem;
    --p-duration-0: 0ms;
    --p-duration-50: 50ms;
    --p-duration-100: 100ms;
    --p-duration-150: 150ms;
    --p-duration-200: 200ms;
    --p-duration-250: 250ms;
    --p-duration-300: 300ms;
    --p-duration-350: 350ms;
    --p-duration-400: 400ms;
    --p-duration-450: 450ms;
    --p-duration-500: 500ms;
    --p-duration-5000: 5000ms;
    --p-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
    --p-ease-in: cubic-bezier(0.42, 0, 1, 1);
    --p-ease-out: cubic-bezier(0, 0, 0.58, 1);
    --p-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
    --p-linear: cubic-bezier(0, 0, 1, 1);
    --p-keyframes-bounce: p-keyframes-bounce;
    --p-keyframes-fade-in: p-keyframes-fade-in;
    --p-keyframes-pulse: p-keyframes-pulse;
    --p-keyframes-spin: p-keyframes-spin;
    --p-border-radius-05: 0.125rem;
    --p-border-radius-1: 0.25rem;
    --p-border-radius-2: 0.5rem;
    --p-border-radius-3: 0.75rem;
    --p-border-radius-4: 1rem;
    --p-border-radius-5: 1.25rem;
    --p-border-radius-6: 1.875rem;
    --p-border-radius-base: 0.1875rem;
    --p-border-radius-large: 0.375rem;
    --p-border-radius-half: 50%;
    --p-border-width-1: 0.0625rem;
    --p-border-width-2: 0.125rem;
    --p-border-width-3: 0.1875rem;
    --p-border-width-4: 0.25rem;
    --p-border-width-5: 0.3125rem;
    --p-border-base: var(--p-border-width-1) solid var(--p-border-subdued);
    --p-border-dark: var(--p-border-width-1) solid var(--p-border);
    --p-border-transparent: var(--p-border-width-1) solid transparent;
    --p-border-divider: var(--p-border-width-1) solid var(--p-divider);
    --p-space-0: 0;
    --p-space-025: 0.0625rem;
    --p-space-05: 0.125rem;
    --p-space-1: 0.25rem;
    --p-space-2: 0.5rem;
    --p-space-3: 0.75rem;
    --p-space-4: 1rem;
    --p-space-5: 1.25rem;
    --p-space-6: 1.5rem;
    --p-space-8: 2rem;
    --p-space-10: 2.5rem;
    --p-space-12: 3rem;
    --p-space-16: 4rem;
    --p-space-20: 5rem;
    --p-space-24: 6rem;
    --p-space-28: 7rem;
    --p-space-32: 8rem;
    --p-font-family-sans: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    --p-font-family-mono: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    --p-font-size-1: 0.75rem;
    --p-font-size-2: 0.8125rem;
    --p-font-size-3: 0.875rem;
    --p-font-size-4: 0.9375rem;
    --p-font-size-5: 1rem;
    --p-font-size-6: 1.0625rem;
    --p-font-size-7: 1.25rem;
    --p-font-size-8: 1.3125rem;
    --p-font-size-9: 1.5rem;
    --p-font-size-10: 1.625rem;
    --p-font-size-11: 1.6875rem;
    --p-font-size-12: 1.75rem;
    --p-font-size-13: 2.625rem;
    --p-font-weight-regular: 400;
    --p-font-weight-medium: 500;
    --p-font-weight-semibold: 600;
    --p-font-weight-bold: 700;
    --p-line-height-1: 1rem;
    --p-line-height-2: 1.25rem;
    --p-line-height-3: 1.5rem;
    --p-line-height-4: 1.75rem;
    --p-line-height-5: 2rem;
    --p-line-height-6: 2.25rem;
    --p-line-height-7: 2.75rem;
    --p-z-1: 100;
    --p-z-2: 400;
    --p-z-3: 510;
    --p-z-4: 512;
    --p-z-5: 513;
    --p-z-6: 514;
    --p-z-7: 515;
    --p-z-8: 516;
    --p-z-9: 517;
    --p-z-10: 518;
    --p-z-11: 519;
    --p-z-12: 520;
}

</style>
