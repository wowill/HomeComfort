<template>
  <!-- action="/basic-api/sys/file/upload" -->
  <span @click="onClick">
    <input
      type="file"
      @change="handleFileChange"
      ref="inputRef"
      style="display: none"
      v-bind="$attrs"
    />
    <slot>
      <Button type="primary">
        {{ t('common.selectFile') }}
      </Button>
    </slot>
    <span>{{ props.tip }}</span>
  </span>
  <div class="preview-img-list" v-if="props.preview">
    <div class="preview-img-item" v-for="(img, index) in fileList" :key="img.fileId">
      <Image :src="img.filePath" :width="100" :height="100" />
      <DeleteOutlined @click="handleDeleteImg(index)" class="delete-img-icon" />
    </div>
  </div>
  <template v-else-if="props.fileListShow && fileList.length">
    <List class="preview-file-list" :data-source="fileList">
      <template #renderItem="{ item, index }">
        <List.Item class="preview-file-item">
          {{ item.fileName }}
          <template #actions>
            <DeleteOutlined @click="handleDeleteImg(index)" class="delete-img-icon" />
          </template>
        </List.Item>
      </template>
    </List>
  </template>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Button, Image, message as Message, List } from 'ant-design-vue';
  import { DeleteOutlined } from '@ant-design/icons-vue';
  import { uploadFile } from '/@/api/sys/file';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  const props = defineProps({
    fileList: [Array, Object] as PropType<UploadItem[] | UploadItem>,
    tip: {
      type: String,
      // default: ""
    },
    preview: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 1,
    },
    fileListShow: {
      type: Boolean,
      default: true,
    },
    /**
     * unit is MB
     */
    size: {
      type: Number,
    },
    fileType: {
      type: String,
    },
  });
  const emit = defineEmits(['update:fileList']);
  const inputRef = ref<HTMLInputElement>();

  const fileList = computed(() => {
    if (Array.isArray(props.fileList)) {
      return (props.fileList as UploadItem[]) || [];
    }
    return props.fileList ? [props.fileList] : [];
  });

  const onClick = () => {
    if (fileList.value.length > props.limit) {
      return;
    }
    const el = inputRef.value!;
    el.click();
  };

  // // const attrs = useAttrs();
  // const fileList = computed({
  //   get() {
  //     return props.fileList;
  //   },
  //   set(val) {
  //     console.log(val);
  //     emit('update:fileList', val);
  //   },
  // });
  const beforeUploadFn = (file: File) => {
    if (props.size) {
      if (file.size > props.size * 1024 * 1024) {
        Message.warning(
          t('common.fileSizeLimit', {
            size: props.size < 1 ? `${props.size * 1000}K` : `${props.size}M`,
          }),
        );
        return false;
      }
    }
    if (props.fileType) {
      console.log('file.type', file.type);
      const [fileType, fileExt] = file.type.split('/');
      if (fileType !== props.fileType && !props.fileType.split('/').includes(fileExt)) {
        Message.warning(
          t('common.uploadFileType', {
            type: props.fileType,
          }),
        );
        return false;
      }
    }
    return true;
  };
  const handleFileChange = (e: ChangeEvent) => {
    const files = e.target.files;
    if (!files) return;
    console.log(files);
    const uploadFileList = Array.from(files);
    if (props.limit < uploadFileList.length + fileList.value.length) {
      Message.warning(
        t('common.uploadNumberLimit', {
          size: props.limit,
        }),
      );
      return;
    }
    let allSatisfy = uploadFileList.every((file) => beforeUploadFn(file));
    if (allSatisfy) {
      Promise.all(uploadFileList.map((file) => uploadFile({ file }))).then((res) => {
        emit('update:fileList', props.limit === 1 ? res[0] : fileList.value.concat(res));
      });
    }
    // .finally(() => {
    //   const el = inputRef.value!;
    //   el.value = '';
    // });
  };
  const handleDeleteImg = (index: number) => {
    emit(
      'update:fileList',
      fileList.value.filter((_, i) => i !== index),
    );
  };
</script>

<style lang="less">
  .preview-img-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .preview-img-item {
      position: relative;

      .delete-img-icon {
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: 20px;
      }

      .ant-image-img {
        width: 100px;
        height: 100px;
        object-fit: contain;
      }
    }
  }
</style>
