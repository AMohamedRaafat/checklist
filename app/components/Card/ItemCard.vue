<template>
  <div
    class="relative group overflow-hidden rounded-lg border border-gray-200 hover:border-emerald-300 transition-all duration-200 hover:shadow-md"
    :class="{
      'bg-green-50 border-green-300': item.isDone,
      'bg-white hover:bg-emerald-50': !item.isDone,
    }"
  >
    <div class="p-4 flex gap-3 items-start">
      <!-- Checkbox -->
      <input
        :id="`checkbox-${item.id}`"
        type="checkbox"
        :checked="item.isDone"
        @change="updateItem(item.id)"
        class="w-5 h-5 mt-1 cursor-pointer text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500 focus:ring-2 transition-colors"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <label
          :for="`checkbox-${item.id}`"
          class="block select-none cursor-pointer"
        >
          <p
            class="font-semibold text-gray-800 text-sm mb-1 transition-all"
            :class="{
              'line-through text-gray-500': item.isDone,
            }"
          >
            {{ item.name }}
          </p>
          <p
            class="text-xs text-gray-600 leading-relaxed transition-all"
            :class="{
              'line-through text-gray-400': item.isDone,
            }"
          >
            {{ item.description }}
          </p>
        </label>
      </div>

      <!-- Status Badge -->
      <div v-if="item.isDone" class="flex-shrink-0">
        <span
          class="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
        >
          ✓
        </span>
      </div>
    </div>

    <!-- Decorative top border for pending items -->
    <div
      v-if="!item.isDone"
      class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:h-1 transition-all"
    ></div>
  </div>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  updateItem: {
    type: Function,
    required: true,
  },
});
</script>
