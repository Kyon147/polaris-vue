<template>
<div ref="element"
     :class="classes"
     @focus="onFocus"
     @blur="onBlur"
     @mouseenter="onMouseEnter"
     @mouseleave="onMouseLeave"
     @click="onClick"
>
    <polaris-unstyled-link
        v-if="url && !disabled"
        :aria-describedby="realId"
        class="Polaris-ResourceList__Link"
        :url="url">
    </polaris-unstyled-link>
    <slot v-if="!disabled" name="url"></slot>

    <div class="Polaris-ResourceList__Container"
         :id="realId">

        <div class="Polaris-ResourceItem__Owned">

            <template v-if="selectable">
                <div class="Polaris-ResourceItem__Handle">
                    <polaris-checkbox
                        v-model="checkedValue"
                        label-hidden
                        :disabled="disabled"
                        @change="onChange"
                    />
                </div>
            </template>

            <template v-if="media || $slots.media">
                <div class="Polaris-ResourceList__Media">
                    <slot name="media">
                        <polaris-thumbnail
                            :source="media.src"
                            :alt="media.alt"
                            :size="media.size">
                        </polaris-thumbnail>
                    </slot>
                </div>
            </template>
        </div>

        <div class="Polaris-ResourceList__Content">
            <div class="Polaris-ResourceList__Attributes">
                <p class="Polaris-ResourceList__AttributeOne">
                    {{ attributeOne }}
                </p>

                <div v-if="attributeTwo || $slots.attributeTwo"
                     class="Polaris-ResourceList__AttributeTwo">
                    <slot name="attributeTwo">
                        {{ attributeTwo }}
                    </slot>
                </div>

                <div v-if="badges" class="Polaris-ResourceList__Badge">
                    <polaris-badge
                        v-for="(badge, i) in badges"
                        :key="`badge_${i + badge.content + badge.status}`"
                        :status="badge.status">
                        {{ badge.content }}
                    </polaris-badge>
                </div>

                <div v-if="attributeThree || $slots.attributeThree"
                     class="Polaris-ResourceList__AttributeThree">
                    <slot name="attributeThree">
                        {{ attributeThree }}
                    </slot>
                </div>
            </div>

            <ul v-if="exceptions"
                class="Polaris-ResourceList__Exceptions">
                <li v-for="(ex, i) in exceptions"
                    :key="`ex_${i}`"
                    :class="exceptionItemClass(ex)">
                    <div v-if="ex.title"
                         class="Polaris-ResourceList__Title">
                        {{ ex.title }}
                    </div>
                    <div v-if="ex.description"
                         class="Polaris-ResourceList__Description">
                        {{ ex.description }}
                    </div>
                </li>
            </ul>
        </div>

        <template v-if="actions">
            <template v-if="persistActions">
                <div class="Polaris-ResourceList__Actions">
                    <polaris-button-group>
                        <polaris-button-group-item
                            v-for="(action, i) in actions"
                            :key="`action_${i}`"
                            plain>
                            <polaris-button
                                @click="handleAction(action)"
                                :url="action.url"
                                :destructive="action.destructive"
                                :disabled="action.disabled"
                                :icon="action.icon"
                                :accessibility-label="action.accessibilityLabel"
                                size="slim"
                                plain>
                                {{ action.content }}
                            </polaris-button>
                        </polaris-button-group-item>
                    </polaris-button-group>
                </div>
                <div class="Polaris-ResourceList__Disclosure">
                    <polaris-popover
                        @click="onCloseActions"
                        :active="actionsMenuVisible">
                        <polaris-button
                            slot="activator"
                            aria-label="Actions dropdown"
                            @click="onExpandActions"
                            plain
                            icon="horizontalDots">
                        </polaris-button>
                        <polaris-action-list :items="actions">
                        </polaris-action-list>
                    </polaris-popover>
                </div>
            </template>
            <div
                v-if="!persistActions"
                class="Polaris-ResourceList__Actions">
                <polaris-button-group segmented>
                    <polaris-button
                        v-for="(action, i) in actions"
                        :key="`action_${i}`"
                        @click="handleAction(action)"
                        :primary="action.primary"
                        :url="action.url"
                        :destructive="action.destructive"
                        :disabled="action.disabled"
                        :icon="action.icon"
                        size="slim"
                        :accessibility-label="action.accessibilityLabel">
                        {{ action.content }}
                    </polaris-button>
                </polaris-button-group>
            </div>
        </template>
    </div>
</div>
</template>


<script>
import PolarisActionList from './PolarisActionList.vue';
import PolarisUnstyledLink from './PolarisUnstyledLink.vue';
import PolarisThumbnail from './PolarisThumbnail.vue';
import PolarisButtonGroup from './PolarisButtonGroup.vue';
import PolarisButtonGroupItem from './PolarisButtonGroupItem.vue';
import PolarisButton from './PolarisButton.vue';
import PolarisPopover from './PolarisPopover.vue';
import PolarisBadge from './PolarisBadge.vue';

import ComponentHelpers from '../ComponentHelpers.js';
import PolarisCheckbox from "./PolarisCheckbox.vue";

export default {
    components: {
        PolarisCheckbox,
        PolarisActionList,
        PolarisUnstyledLink,
        PolarisThumbnail,
        PolarisButtonGroup,
        PolarisButtonGroupItem,
        PolarisButton,
        PolarisPopover,
        PolarisBadge,
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        id: {
            type: [String, Number],
            required: true
        },
        url: String,
        media: Object,
        attributeOne: String,
        attributeTwo: String,
        attributeThree: String,
        badges: {
            type: Array,
            default() {
                return [];
            }
        },
        exceptions: {
            type: Array,
            default() {
                return [];
            }
        },
        actions: {
            type: Array,
            default() {
                return [];
            }
        },
        persistActions: Boolean,
        selectable: Boolean,
        disabled: Boolean,
        selectMode: Boolean,
        checked: {
            type: Boolean,
            default(){
                return false;
            }
        },
    },
    data() {
        return {
            actionsMenuVisible: false,
            focused: false,
            // selectMode: false,
            checkedValue: this.checked
        };
    },
    computed: {

        realId() {
            return (this.id) ? this.id : 'PolarisResourceListItem'+this._uid;
        },
        classes() {
            var r = ComponentHelpers.makeComponentClass('Polaris-ResourceList__Item', [
                'focused',
                'persistActions',
                'mediaType',
                'mediaSize',
            ], this);

            if (this.url) {
                r['Polaris-ResourceList__Item--link'] = true;
            }

            if (this.checkValue) {
                r['Polaris-ResourceItem--selected'] = true;
            }

            if (this.selectable){
                r['Polaris-ResourceItem--selectable'] = true;
            }

            if (this.disabled) {
                r['Polaris-ResourceItem--disabled'] = true;
            }

            if (this.selectMode) {
                r['Polaris-ResourceItem--selectMode'] = true;
            }

            return r;
        }
    },
    watch: {
        checkedValue : function (newVal, oldVal) {
            this.updateListItems()
        },
    },
    methods: {
        exceptionItemClass(ex) {
            return ComponentHelpers.makeComponentClass('Polaris-ResourceList__ExceptionItem', [
                'status'
            ], ex);
        },
        onMouseEnter() {
            this.focused = true;
        },
        onMouseLeave() {
            this.focused = false;
        },
        onFocus() {
            this.focused = true;
        },
        onClick() {
            console.log('clicked');
            if (this.disabled || !this.selectMode) {return}
            this.checkedValue = !this.checkedValue;
            this.$emit('click', this);
        },
        onChange(e) {
            console.log( e );
            var target = e.target || e.srcElement;
            this.$emit('change', e);
        },
        onBlur(e) {
            if (!this.$refs.element || !this.$refs.element.contains(e.relatedTarget)) {
                this.focused = false;
            }
        },
        onExpandActions() {
            this.actionsMenuVisible = !this.actionsMenuVisible;
        },
        onCloseActions() {
            this.actionsMenuVisible = false;
        },
        handleAction(action) {
            if (action.onAction) {
                action.onAction();
            }
        },
        updateListItems(e){
            console.log( "emit selection change from check" );
            this.$parent.$emit('on-selection-change', this);
            console.log( this );
        }
    }
};
</script>
<style>
    .Polaris-ResourceList__Container{
        z-index: 2;
    }
    .Polaris-ResourceItem__Owned{
        display: flex;
    }
    .Polaris-ResourceItem__Handle{
        pointer-events: all;
        cursor: pointer !important;
    }

    .Polaris-Choice {
        display: inline-flex;
        justify-content: flex-start;
        padding: 1.7rem 1.7rem;
    }

    .Polaris-ResourceItem__Handle {
        width: 4.8rem;
        min-height: 4.4rem;
        justify-content: center;
        align-items: center;
        margin: -1.2rem .4rem -1.2rem -1.2rem;
        display: flex;
    }
    .Polaris-ResourceItem--selected:not(.Polaris-ResourceItem--newDesignLanguage) {
        background-image: linear-gradient(rgba(179,188,245,.15),rgba(179,188,245,.15));
    }
    .Polaris-ResourceList__Item {
        position: relative;
        outline: none;
        cursor: default;
    }
    .Polaris-ResourceList__Link{
        z-index: 1;
        cursor: pointer;
    }
    .Polaris-ResourceItem--disabled{
        pointer-events: none;
        cursor: default;
    }
    .Polaris-ResourceItem--disabled a{
        pointer-events: none;
        cursor: default;
    }

    .Polaris-ResourceItem--selectable {
        width: calc(100% + 4rem);
        transform: translateX(-4rem);
        transition: transform .2s cubic-bezier(.64,0,.35,1);
        margin-right: -4rem;
    }

    .Polaris-ResourceItem--selectable.Polaris-ResourceItem--selectMode .Polaris-ResourceItem__Handle{
        pointer-events: none;
    }

    @media screen and (min-width: 28.625em){

        .Polaris-ResourceItem--selectable {
            width: 100%;
            transform: translateX(0);
            margin-right: 0;
        }

    }

    .Polaris-ResourceItem--selectable.Polaris-ResourceItem--selectMode {
        transform: translateX(0);
        cursor: pointer;
    }

    .Polaris-ResourceItem--selectMode a{
        pointer-events: none;
        cursor: default;
    }


</style>
