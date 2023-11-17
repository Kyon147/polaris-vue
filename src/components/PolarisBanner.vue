<template>
<div :class="classes"
     tabindex="0"
     :role="'banner '+((status == 'warning' || status == 'critical') ? 'alert' : '')"
     :aria-describedby="realId+'Content'"
     :aria-labelledby="realId+'Heading'">
    <div v-if="hasOnDismissHandler" class="Polaris-Banner__Dismiss">
        <polaris-button plain
                        icon-only
                        accessibility-label="Dimiss notification"
                        :icon="dismissIcon"
                        @click="onDismiss">
        </polaris-button>
    </div>
    <div>
        <div v-if="title" class="Polaris-Banner__Heading" :id="realId+'Heading'">
            <polaris-stack alignment="center">
                <polaris-icon
                    class="Polaris-Banner__Icon"
                    :source="iconSource"
                    :color="iconColor">
                </polaris-icon>
                <polaris-heading tag="p" variant="headingSm">
                    {{ title }}
                </polaris-heading>
            </polaris-stack>
        </div>
        <div v-if="$slots.default || action || secondaryAction || children" class="Polaris-Banner__Content" id="realId+'Content'">
            <slot>
                <div v-if="children">{{ children }}</div>
            </slot>

            <div v-if="action" class="Polaris-Banner__Actions">
                <polaris-button-group>
                    <polaris-button slot="1"
                                    outline
                                    @click="handleAction(action)"
                                    :url="action.url"
                                    :destructive="action.destructive"
                                    :disabled="action.disabled"
                                    :accessibility-label="action.accessibilityLabel"
                                    :icon="action.label">
                        {{ action.content }}
                    </polaris-button>
                    <div v-if="secondaryAction" slot="2"
                         class="Polaris-Banner__SecondaryAction"
                         @click="handleAction(secondaryAction, true)">
                        <span class="Polaris-Banner__Text">
                            {{ secondaryAction.content }}
                        </span>
                    </div>
                </polaris-button-group>
            </div>
        </div>
    </div>

</div>
</template>


<script>
import ComponentHelpers from '../ComponentHelpers.js';
import PolarisIcon from './PolarisIcon.vue';
import PolarisHeading from './PolarisHeading.vue';
import PolarisButton from './PolarisButton.vue';
import PolarisButtonGroup from './PolarisButtonGroup.vue';

import successIcon from '../resources/banner/circle-check-mark.svg';
import fallbackIcon  from '../resources/banner/circle-information.svg';
import warningIcon  from '../resources/banner/circle-alert.svg';
import criticalIcon  from '../resources/banner/circle-barred.svg';
import infoIcon  from '../resources/banner/circle-information.svg';

import dismissIcon from '../resources/dismiss-icon.svg';

export default {
    name: 'PolarisBanner',
    components: {
        PolarisIcon,
        PolarisHeading,
        PolarisButton,
        PolarisButtonGroup,
    },
    props: {
        title: String,
        icon: String,
        status: {
            type: String,
            default: 'default',
            validator(v) {
                return [
                    'default',
                    'success',
                    'info',
                    'warning',
                    'critical',
                ].indexOf(v) !== -1;
            }
        },
        action: Object,
        secondaryAction: Object,
        children: String
    },
    data() {
        return {
            dismissIcon: dismissIcon
        };
    },
    methods: {
        handleAction(action, handleUrl) {
            if (action.onAction) {
                action.onAction();
            }
            if (handleUrl && action.url) {
                window.location.href = action.url;
            }
        },
        onDismiss() {
            this.$emit('dismiss');
        }
    },
    computed: {
        hasOnDismissHandler() {
            return this._events['dismiss'] && this._events['dismiss'].length > 0;
        },
        realId() {
            return 'Banner' + this._uid;
        },

        finalIconSource() {
            return this.iconSource;
        },

        iconSource() {
            var icon = this.icon;
            if (!icon) {
                switch (this.status) {
                    case 'success':
                        return successIcon;
                    case 'info':
                        return infoIcon;
                    case 'warning':
                        return warningIcon;
                    case 'critical':
                        return criticalIcon;
                    default:
                        return fallbackIcon;
                }
            }
            return icon;
        },
        iconColor() {
            switch (this.status) {
                case 'success':
                    return 'white';
                case 'info':
                    return 'black';
                case 'warning':
                    return 'black';
                case 'critical':
                    return 'white';
                default:
                    return 'black';
            }
        },
        classes() {
            var r =  ComponentHelpers.makeComponentClass('Polaris-Banner', [
                'status'
            ], this);

            if (this.hasOnDismissHandler) {
                r['Polaris-Banner--hasDismiss'] = true;
            }

            return r;
        }
    }

}
</script>
