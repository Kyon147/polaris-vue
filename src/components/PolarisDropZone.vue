<template>
    <div :style="styleBasedOnSize">
        <polaris-labelled
            :id="id"
            :label="label"
            :action="labelAction"
            :labelHidden="label ? labelHidden : true"
        >
            <div
                ref="node"
                :class="classNames"
                :aria-disabled="disabled"
                @click="handleOnClick"
                @dragstart="stopEvent"
            >
                <template
                    v-if="(active || dragging) && !intervalError && !error && overlay"
                >
                    <div
                        :class="overlayClassName"
                    >
                        <polaris-stack vertical="" spacing="tight">
                            <polaris-display-text v-if="size === 'extraLarge'" size="small" element="p">
                                {{ overlayTextWithDefault }}
                            </polaris-display-text>
                        </polaris-stack>
                    </div>
                </template>
                <template
                    v-if="dragging && (intervalError || error)"
                >
                    <div
                        :class="overlayClassName"
                    >
                        <polaris-stack vertical spacing="tight">
                            <polaris-display-text v-if="size === 'extraLarge'" size="small" element="p">
                                {{ errorOverlayTextWithDefault }}
                            </polaris-display-text>
                        </polaris-stack>
                    </div>
                </template>
                <span class="Polaris-VisuallyHidden">
                    <!--  Triggered on focus @event focus-->
                    <!-- Triggered on blur  @event blur -->
                    <polaris-drop-zone-input
                        :id="id"
                        :accept="accept"
                        :disabled="disabled"
                        :type="type"
                        :multiple="allowMultiple"
                        @change="handleDrop"
                        @focus="$emit('focus', $event)"
                        @blur="$emit('blur', $event)"
                        :openFileDialog="openFileDialog"
                        :onFileDialogClose="handleOnFileDialogClose"
                    />
                </span>
                <div
                    class="Polaris-DropZone__Container"
                >
                    <polaris-file-upload
                        v-if="!files.length"
                        :disabled="disabled"
                        :variableHeight="variableHeight"
                        :size="size"
                        :actionTitle="actionTitle"
                        :actionHint="actionHint"
                    />
                        <div  v-if="uploadedFiles && files && files.length > 0">
                            <polaris-stack
                                v-for="(file, key) in files"
                                :key="key"
                                alignment="center"
                            >
                                <polaris-stack-item>
                                    <!-- @TODO Add cancel button Icons  -->
                                    <polaris-thumbnail
                                        size="small"
                                        :alt="file.name"
                                        :source="validImageTypes.indexOf(file.type) > -1
                                                 ? createFileURL(file)
                                                 : noteSvg"

                                    />
                                </polaris-stack-item>
                                <polaris-stack-item>
                                    <div>
                                        {{ file.name }}
                                        <polaris-caption>{{ file.size }} bytes</polaris-caption>
                                    </div>
                                </polaris-stack-item>
                                <polaris-stack-item>
                                    <polaris-icon
                                        source="circleCancel"
                                        color="red"
                                        @click.native.stop="removeFiles(key)"
                                    />
                                </polaris-stack-item>
                            </polaris-stack>
                        </div>
                </div>
            </div>
        </polaris-labelled>
    </div>
</template>

<script>
import PolarisLabelled from "./PolarisLabelled";
import PolarisStack from "./PolarisStack";
import PolarisDisplayText from "./PolarisDisplayText";
import PolarisStackItem from "./PolarisStackItem";
import PolarisIcon from "./PolarisIcon";
import PolarisCaption from "./PolarisCaption";
import PolarisThumbnail from "./PolarisThumbnail";
import PolarisDropZoneInput from "./PolarisDropZoneInput";
import PolarisFileUpload from "./PolarisFileUpload";
import ComponentHelpers from '../ComponentHelpers.js';
import Notes from '../resources/icons/notes.svg'

export default {
    name: "PolarisDropZone",
    components: {
        PolarisFileUpload,
        PolarisDropZoneInput,
        PolarisThumbnail,
        PolarisCaption,
        PolarisIcon,
        PolarisStackItem,
        PolarisDisplayText,
        PolarisStack,
        PolarisLabelled
    },
    props: {
        /**
         * Label for the file input
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * Adds an action to the label
         */
        labelAction: {
            type: Object,
        },
        /**
         * Visually hide the label
         */
        labelHidden: {
            type: Boolean,
            default: false,
        },
        /**
         * ID for file input
         */
        id: {
            type: [Number, String],
            default: `PDropZone${new Date().getUTCMilliseconds()}`,
        },
        /**
         * Allowed file types
         */
        accept: {
            type: String,
            default: null,
        },
        /**
         * Whether is a file or an image
         * @default 'file'
         */
        type: {
            type: [String],
            default: 'file',
        },
        /**
         * Sets an active state
         */
        active: {
            type: Boolean,
            default: false,
        },
        /**
         * Sets an error state
         */
        error: {
            type: Boolean,
            default: false,
        },
        /**
         * Displays an outline border
         * @default true
         */
        outline: {
            type: Boolean,
            default: true,
        },
        /**
         * Displays an overlay on hover
         * @default true
         */
        overlay: {
            type: Boolean,
            default: true,
        },
        /**
         * Text that appears in the overlay
         */
        overlayText: {
            type: String,
            default: null,
        },
        /**
         * Text that appears in the overlay when set in error state
         */
        errorOverlayText: {
            type: String,
            default: null,
        },
        /**
         * Allows multiple files to be uploaded at once
         * @default true
         */
        allowMultiple: {
            type: Boolean,
            default: true,
        },
        /**
         * Sets a disabled state
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Allows a file to be dropped anywhere on the page
         */
        dropOnPage: {
            type: Boolean,
            default: false,
        },
        /**
         * Sets the default file dialog state
         */
        openFileDialog: {
            type: Boolean,
            default: false,
        },
        /**
         * Allows child content to adjust height
         */
        variableHeight: {
            type: Boolean,
            default: false,
        },
        // /**
        //  * Adds custom validations
        //  */
        // customValidator: {
        //     type: Boolean,
        //     default: false,
        // },
        /**
         *  Callback triggered on any file drop
         */
        handleOnDrop: {
            type: Function,
            // tslint:disable-next-line:no-empty
            default: (files, acceptedFiles, rejectedFiles) => ({}),
            required: true,
        },
        /**
         * Callback triggered when at least one of the files dropped was accepted
         */
        handleOnDropAccepted: {
            type: Function,
            // tslint:disable-next-line:no-empty
            default: (acceptedFiles) => ({}),
        },
        /**
         * Callback triggered when at least one of the files dropped was rejected
         */
        handleOnDropRejected: {
            type: Function,
            // tslint:disable-next-line:no-empty
            default: (rejectedFiles) => ({}),
        },
        /**
         * Callback triggered when one or more files are dragging over the drag area
         */
        handleOnDragOver: {
            type: Function,
            // tslint:disable-next-line:no-empty
            default: () => ({}),
        },
        /**
         * Callback triggered when one or more files entered the drag area
         */
        handleOnDragEnter: {
            type: Function,
            // tslint:disable-next-line:no-empty
            default: () => ({}),
        },
        /**
         * Callback triggered when one or more files left the drag area
         */
        handleOnDragLeave: {
            type: Function,
            // tslint:disable-next-line:no-empty
            default: () => ({}),
        },
        /**
         * Callback triggered when the file dialog is canceled
         */
        handleOnFileDialogClose: {
            type: Function,
            // tslint:disable-next-line:no-empty
            default: () => ({}),
        },
        /**
         * Files
         */
        files: {
            type: Array,
            default: () => ([]),
            required: true,
        },
        /**
         * Display Uploaded Files in DropZone
         */
        uploadedFiles: {
            type: Boolean,
            default: true,
        },
        // /**
        //  * Change size of the DropZone
        //  */
        // size: {
        //     type: String,
        //     default: 'extraLarge',
        // },
        /**
         * Valid Image Types to preview images
         */
        validImageTypes: {
            type: Array,
            default: () => ['image/gif', 'image/jpeg', 'image/png'],
        },
        /**
         * Set the actionTitle
         */
        actionTitle: {
            type: String,
            default() {
                console.log( 'type', this.type );
                if ( this.type === 'file' && this.allowMultiple ){
                    return 'Add files'
                } else if (this.type === 'file' && !this.allowMultiple) {
                    return 'Add file'
                }

                if ( this.type === 'image' && this.allowMultiple ){
                    return 'Add images'
                } else if (this.type === 'image' && !this.allowMultiple) {
                    return 'Add image'
                }

                return 'Add files'

            }
        },
        /**
         * Set the actionHint
         */
        actionHint: {
            type: String,
            default: `or drop files to upload`,
        },
    },
    data() {
        return {
            dragTargets: [],
            size: 'extraLarge',
            dragging: false,
            intervalError: false,
            measuring: true,
            NoteMinor: '',
            dragEvents: ['dragover', 'dragenter', 'drop']
        };
    },
    computed: {
        classNames() {
            return ComponentHelpers.classNames(
                'Polaris-DropZone',
                this.outline && 'Polaris-DropZone--hasOutline',
                this.focused && 'Polaris-DropZone--focused',
                (this.active || this.dragging) && 'Polaris-DropZone--isDragging',
                this.disabled && 'Polaris-DropZone--isDisabled',
                (this.intervalError || this.error) && 'Polaris-DropZone--hasError',
                !this.variableHeight && `Polaris-DropZone--${ComponentHelpers.variationName('size', this.size)}`,
                this.measuring && 'Polaris-DropZone--measuring',
            );
        },
        overlayClassName() {
            return classNames(
                'Polaris-DropZone__Overlay',
            );
        },
        overlayTextWithDefault() {
            if (!this.overlayText && this.allowMultiple) {
                return 'Drop files to upload';
            } else if (!this.overlayText && !this.allowMultiple) {
                return 'Drop file to upload';
            } else {
                return this.overlayText;
            }
        },
        errorOverlayTextWithDefault() {
            if (!this.errorOverlayText) {
                return 'File type is not valid';
            } else {
                return this.errorOverlayText;
            }
        },
        context() {
            const type = this.type || 'file';
            return [this.disabled, focused, this.size, type, this.measuring, this.allowMultiple];
        },
        styleBasedOnSize() {
            // if (this.size === 'small') {
            //   return 'width: 50px; height: 50px;';
            // } else if(this.size === 'medium') {
            //   return 'width: 114px; height: 114px;';
            // }
            return '';
        },
        noteSvg() {
            return Notes
        }
    },
    methods: {
        accepts(file, acceptedFiles) {
            if (file && acceptedFiles) {
                const fileName = file.name || '';
                const mimeType = file.type || '';
                const baseMimeType = mimeType.replace(/\/.*$/, '');
                const acceptedFilesArray = Array.isArray(acceptedFiles)
                    ? acceptedFiles
                    : acceptedFiles.split(',');

                return acceptedFilesArray.some((type) => {
                    const validType = type.trim();
                    if (validType.startsWith('.')) {
                        return fileName.toLowerCase().endsWith(validType.toLowerCase());
                    } else if (validType.endsWith('/*')) {
                        // This is something like an image/* mime type
                        return baseMimeType === validType.replace(/\/.*$/, '');
                    }
                    return mimeType === validType;
                });
            }
            return true;
        },
        stopEvent(event) {
            event.preventDefault();
            event.stopPropagation();
        },
        fileAccepted(file, accept) {
            return file.type === 'application/x-moz-file' || this.accepts(file, accept);
        },
        getValidatedFiles(files) {
            const acceptedFiles = [];
            const rejectedFiles = [];
            Array.from(files).forEach((file) => {
                !this.fileAccepted(file, this.accept) ? rejectedFiles.push(file) : acceptedFiles.push(file);
            });
            if (!this.allowMultiple) {
                acceptedFiles.slice(1, acceptedFiles.length);
                rejectedFiles.push(...acceptedFiles.slice(1));
            }
            return {files, acceptedFiles, rejectedFiles};
        },
        handleDrop(event) {
            this.stopEvent(event);
            if (this.disabled) {
                return;
            }
            const fileList = this.getDataTransferFiles(event);
            const {files, acceptedFiles, rejectedFiles} = this.getValidatedFiles(fileList);
            this.dragTargets = [];
            this.dragging = false;
            this.intervalError = rejectedFiles.length > 0;
            this.handleOnDrop && this.handleOnDrop(files, acceptedFiles, rejectedFiles);
            this.handleOnDropAccepted && acceptedFiles.length && this.handleOnDropAccepted(acceptedFiles);
            this.handleOnDropRejected && rejectedFiles.length && this.handleOnDropRejected(rejectedFiles);
            (event.target).value = '';
        },
        handleDragOver(event) {
            this.stopEvent(event);
            if (this.disabled) {
                return;
            }
            this.handleOnDragOver && this.handleOnDragOver();
        },
        handleDragEnter(event) {
            this.stopEvent(event);
            if (this.disabled) {
                return;
            }
            const fileList = this.getDataTransferFiles(event);
            if (event.target && !this.dragTargets.includes(event.target)) {
                this.dragTargets.push(event.target);
            }
            if (this.dragging) {
                return;
            }
            const {rejectedFiles} = this.getValidatedFiles(fileList);
            this.dragging = true;
            this.intervalError = rejectedFiles.length > 0;
            this.handleOnDragEnter && this.handleOnDragEnter();
        },
        handleDragLeave(event) {
            event.preventDefault();
            if (this.disabled) {
                return;
            }
            this.dragTargets = this.dragTargets.filter((el) => {
                const compareNode = this.dropOnPage && !isServer ? document : this.$refs.node;
                return el !== event.target && compareNode && compareNode.contains(el);
            });
            if (this.dragTargets.length > 0) {
                return;
            }
            this.dragging = false;
            this.intervalError = false;
            this.handleOnDragLeave && this.handleOnDragLeave();
        },
        adjustSize() {
            if (!this.$refs.node) {
                return;
            }
            if (this.variableHeight) {
                this.measuring = false;
                return;
            }
            let size = 'extraLarge';
            const width = this.$refs.node.getBoundingClientRect().width;
            if (width < 100) {
                size = 'small';
            } else if (width < 160) {
                size = 'medium';
            } else if (width < 300) {
                size = 'large';
            }
            this.size = size;
            this.measuring && (this.measuring = false);
        },
        /**
         * Callback triggered on click
         */
        handleOnClick() {
            if (this.disabled) {
                return;
            }
            return onclick ? onclick : this.open();
        },
        open() {
            const fileInputNode = this.$refs.node && this.$refs.node.querySelector(`#${this.id}`);
            fileInputNode && fileInputNode instanceof HTMLElement && fileInputNode.click();
        },
        createFileURL(file) {
            return window.URL.createObjectURL(file);
        },
        removeFiles(key) {
            this.files.splice(key, 1);
        },
        isDragEvent(event) {
            return this.dragEvents.indexOf(event.type) > 0;
        },
        isChangeEvent(event) {
            return event.type === 'change';
        },
        getDataTransferFiles(event) {
            if (this.isDragEvent(event) && event.dataTransfer) {
                const dt = event.dataTransfer;
                if (dt.files && dt.files.length) {
                    return Array.from(dt.files);
                } else if (dt.items && dt.items.length) {
                    // Chrome is the only browser that allows to read the file list on drag
                    // events and uses `items` instead of `files` in this case.
                    return Array.from(dt.items);
                }
            } else if (this.isChangeEvent(event) && (event.target).files) {
                // Return files from even when a file was selected from an upload dialog
                const target = event.target;
                return target.files;
            }

            return [];
        }
    },
    mounted() {
        this.adjustSize();
        const dropNode = this.dropOnPage ? document : this.$refs.node;
        if (!dropNode) {
            return;
        }
        dropNode.addEventListener('drop', this.handleDrop);
        dropNode.addEventListener('dragover', this.handleDragOver);
        dropNode.addEventListener('dragenter', this.handleDragEnter);
        dropNode.addEventListener('dragleave', this.handleDragLeave);
        window.addEventListener('resize', this.adjustSize);
    },
    destroyed() {
        const dropNode = this.dropOnPage ? document : this.$refs.node;
        if (!dropNode) {
            return;
        }
        dropNode.removeEventListener('drop', this.handleDrop);
        dropNode.removeEventListener('dragover', this.handleDragOver);
        dropNode.removeEventListener('dragenter', this.handleDragEnter);
        dropNode.removeEventListener('dragleave', this.handleDragLeave);
        window.removeEventListener('resize', this.adjustSize);
    },
}
</script>

<style scoped>

</style>
