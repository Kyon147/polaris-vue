<template>
<polaris-labelled
    :id="realId"
    :label="label"
    :error="error"
    :action="labelAction"
    :label-hidden="(labelInline) ? true : labelHidden"
    :help-text="helpText">
    <template v-if="$slots.helpText" slot="helpText">
        <slot name="helpText"></slot>
    </template>

    <div :class="classes">
        <select
            :id="realId"
            :name="name"
            :value="value"
            class="Polaris-Select__Input"
            :disabled="disabled"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            :aria-invalid="!!error"
            :aria-describedby="describedBy">
            <option
                v-if="!value && placeholder"
                :label="placeholder"
                :value="null"
                disabled
                hidden>
            </option>

            <template v-if="options">
                <template v-for="option in options">
                    <option
                        v-if="typeof option == 'string'"
                        :key="option"
                        :value="option">
                        {{ option }}
                    </option>
                    <option
                        v-if="typeof option != 'string'"
                        :key="option.value"
                        :value="option.value"
                        :disabled="option.disabled">
                        {{ option.label }}
                    </option>
                </template>
            </template>
            <template v-if="!options && groups">
                <template v-for="group in groups">
                    <template v-if="!group.hasOwnProperty('title')">
                        <template v-for="option in group">
                            <option
                                v-if="typeof option == 'string'"
                                :key="option"
                                :value="option">
                                {{ option }}
                            </option>
                            <option
                                v-if="typeof option != 'string'"
                                :key="option.value"
                                :value="option.value"
                                :disabled="option.disabled">
                                {{ option.label }}
                            </option>
                        </template>
                    </template>
                    <template v-if="group.hasOwnProperty('title')">
                        <optgroup
                            :label="group.title"
                            :key="group.title">
                            <template v-for="option in group.options">
                                <option
                                    v-if="typeof option == 'string'"
                                    :key="option"
                                    :value="option">
                                    {{ option }}
                                </option>
                                <option
                                    v-if="typeof option != 'string'"
                                    :key="option.value"
                                    :value="option.value"
                                    :disabled="option.disabled">
                                    {{ option.label }}
                                </option>
                            </template>
                        </optgroup>
                    </template>
                </template>
            </template>
        </select>

        <div class="Polaris-Select__Content">
            <span v-if="labelInline" class="Polaris-Select__InlineLabel">{{label}}</span>
            <span class="Polaris-Select__SelectedOption">{{(!value && placeholder) ? placeholder : value}}</span>
            <div class="Polaris-Select__Icon">
                <polaris-icon :source="arrowUpDown"></polaris-icon>
            </div>
        </div>

        <div class="Polaris-Select__Backdrop"></div>
    </div>
</polaris-labelled>
</template>


<script>
import PolarisLabelled from './PolarisLabelled.vue';
import ComponentHelpers from '../ComponentHelpers.js';
import arrowUpDown from '../resources/arrow-up-down.svg';

export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    components: {
        PolarisLabelled,
    },
    data() {
        return {
            arrowUpDown: arrowUpDown
        };
    },
    props: {
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        groups: {
            type: Array,
            default() {
                return [];
            }
        },
        label: String,
        labelAction: Object,
        labelHidden: Boolean,
        helpText: String,
        id: String,
        name: String,
        error: [Boolean, String],
        disabled: Boolean,
        labelInline: Boolean,
        value: String,
        placeholder: String
    },
    computed: {
        realId() {
            return this.id || 'PolarisSelect'+this._uid;
        },
        classes() {
            var r = ComponentHelpers.makeComponentClass('Polaris-Select', [
                'disabled',
            ], this);

            if (this.error) {
                r['Polaris-Select--error'] = true;
            }

            if (this.value == null && this.placeholder != null) {
                r['Polaris-Select--placeholder'] = true;
            }

            return r;
        },
        describedBy() {
            var r = [];
            if (this.helpText || this.$slots.helpText) {
                r.push(this.realId+'HelpText');
            }
            if (this.error && typeof this.error == 'string') {
                r.push(this.realId+'Error');
            }
            return r;
        }
    },
    methods: {
        onFocus() {
            this.$emit('focus');
        },
        onBlur() {
            this.$emit('blur');
        },
        onChange(e) {
            this.$emit('change', e.currentTarget.value);
        }
    }
};
</script>
<style>

    .Polaris-Select__Input {
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2.4rem;
        text-transform: none;
        letter-spacing: normal;
        position: absolute;
        text-rendering: auto;
        top: 0;
        left: 0;
        z-index: 30;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: .001;
        -webkit-appearance: none;
        -moz-appearance: none;
        color: #212b36 !important;
    }

    .Polaris-Select__Input option:disabled{
        color: #919eab;
    }

    .Polaris-Select__InlineLabel {
        color: #637381;
        margin-right: .4rem;
        white-space: nowrap;
        overflow: hidden;
    }

    .Polaris-Select__Content {
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2.4rem;
        text-transform: none;
        letter-spacing: normal;
        position: relative;
        z-index: 20;
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 3.6rem;
        padding: .5rem .8rem .5rem 1.2rem;
    }

    .Polaris-Select__SelectedOption {
        flex: 1 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (min-width: 40em) {
        .Polaris-Select__Content, .Polaris-Select__Input  {
            font-size: 1.4rem;
        }
    }
</style>
