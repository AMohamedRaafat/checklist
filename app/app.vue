<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header
      class="relative w-full min-h-80 bg-cover bg-center bg-no-repeat text-white shadow-lg"
      :style="{
        backgroundImage: 'url(/bg.jpg)',
        backgroundAttachment: 'cover',
      }"
    >
      <!-- Dark overlay for better text visibility -->
      <div class="absolute inset-0 bg-black/40"></div>

      <div class="relative z-10 bg-transparent container mx-auto px-5 py-12">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="شعار التطبيق"
              class="h-24 w-24 object-contain drop-shadow-lg"
              width="96"
              height="96"
            />
          </div>
          <h1 class="text-5xl font-bold mb-3 drop-shadow-lg">مسوغات التعيين</h1>
          <p class="text-lg drop-shadow">
            قائمة التحقق الشاملة لتعيين شركة نقلة
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Progress Bar -->
      <div class="bg-white border-b border-emerald-200">
        <div class="container mx-auto px-5 py-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-semibold text-gray-700">التقدم</span>
            <span class="text-sm font-semibold text-emerald-600"
              >{{ completedCount }}/{{ data.length }}</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-300"
              :style="{ width: `${(completedCount / data.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Tabs Switcher -->
      <div dir="rtl" class="container mx-auto px-5 py-6">
        <div class="flex gap-2 border-b border-gray-200">
          <button
            @click="activeTab = 'pending'"
            :class="[
              'px-6 py-3 font-semibold text-sm transition-all relative',
              activeTab === 'pending'
                ? 'text-emerald-600'
                : 'text-gray-600 hover:text-gray-800',
            ]"
          >
            <div class="flex items-center gap-2">
              <span>المسوغات المعلقة</span>
              <span
                class="px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold"
              >
                {{ pendingCount }}
              </span>
            </div>
            <div
              v-if="activeTab === 'pending'"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"
            ></div>
          </button>

          <button
            @click="activeTab = 'completed'"
            :class="[
              'px-6 py-3 font-semibold text-sm transition-all relative',
              activeTab === 'completed'
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-800',
            ]"
          >
            <div class="flex items-center gap-2">
              <span>المسوغات المستيفاة</span>
              <span
                class="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold"
              >
                {{ completedCount }}
              </span>
            </div>
            <div
              v-if="activeTab === 'completed'"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-lime-500"
            ></div>
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div dir="rtl" class="container mx-auto px-5 py-10">
        <!-- Pending Items Tab -->
        <Transition name="fade" mode="out-in">
          <div v-show="activeTab === 'pending'" key="pending">
            <div class="space-y-3">
              <Motion
                v-for="item in pendingItems"
                :key="item.id"
                class="p-0"
                :initial="{ scale: 0, opacity: 0 }"
                :animate="{ scale: 1, opacity: 1 }"
              >
                <CardItemCard :item="item" :updateItem="updateItem" />
              </Motion>
              <div v-if="pendingCount === 0" class="text-center py-12">
                <div class="text-5xl mb-2">🎉</div>
                <p class="text-gray-500">تم استيفاء جميع المسوغات!</p>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Completed Items Tab -->
        <Transition name="fade" mode="out-in">
          <div v-show="activeTab === 'completed'" key="completed">
            <div class="space-y-3">
              <Motion
                v-for="item in completedItems"
                :key="item.id"
                class="p-0"
                :initial="{ scale: 0, opacity: 0 }"
                :animate="{ scale: 1, opacity: 1 }"
              >
                <CardItemCard :item="item" :updateItem="updateItem" />
              </Motion>
              <div v-if="completedCount === 0" class="text-center py-12">
                <div class="text-5xl mb-2">📋</div>
                <p class="text-gray-500">لا توجد مسوغات مستيفاة بعد</p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 text-center py-6 mt-12">
      <p>© {{ currentYear }} تطبيق قائمة التحقق</p>
    </footer>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

const activeTab = ref("pending");
const data = ref([
  {
    id: 1,
    name: "أصل شهادة الميلاد كمبيوتر",
    description:
      "تقديم أصل شهادة الميلاد المميكنة (كمبيوتر) حديثة وصالحة للاستخدام الرسمي.",
    isDone: false,
  },
  {
    id: 2,
    name: "أصل شهادة المؤهل الدراسي",
    description:
      "تقديم أصل شهادة المؤهل الدراسي المعتمدة لإثبات الدرجة العلمية.",
    isDone: false,
  },
  {
    id: 3,
    name: "أصل شهادة التجنيد (للذكور فقط)",
    description:
      "تقديم أصل شهادة التجنيد موضحًا بها الموقف من الخدمة العسكرية (للذكور فقط).",
    isDone: false,
  },
  {
    id: 4,
    name: "كعب عمل من مكتب العمل",
    description: "استخراج كعب عمل من مكتب العمل التابع له عنوان محل الإقامة.",
    isDone: false,
  },
  {
    id: 5,
    name: "فيش وتشبيه حديث باسم شركة نقله",
    description:
      "تقديم صحيفة الحالة الجنائية (فيش وتشبيه) حديثة وموجهة باسم شركة نقله.",
    isDone: false,
  },
  {
    id: 6,
    name: "صورة البطاقة الشخصية (سارية)",
    description: "تقديم صورة واضحة من البطاقة الشخصية بشرط أن تكون سارية.",
    isDone: false,
  },
  {
    id: 7,
    name: "عدد 7 صور شخصية حديثة",
    description:
      "تقديم عدد 7 صور شخصية حديثة بخلفية مناسبة لاستخدامها في المستندات الرسمية.",
    isDone: false,
  },
  {
    id: 9,
    name: "برنت رقم تأميني من مكتب التأمينات",
    description:
      "استخراج برنت بالرقم التأميني من مكتب التأمينات الاجتماعية التابع له عنوان الإقامة.",
    isDone: false,
  },
  {
    id: 10,
    name: "نموذج كشف طبي 111 من مستشفى التأمين الصحي",
    description: "تقديم نموذج كشف طبي رقم 111 معتمد من مستشفى التأمين الصحي.",
    isDone: false,
  },
]);

const updateItem = (id) => {
  data.value = data.value.map((item) => {
    if (item.id === id) {
      return { ...item, isDone: !item.isDone };
    }
    return item;
  });
  localStorage.setItem("data", JSON.stringify(data.value));
};

const pendingItems = computed(() => data.value.filter((item) => !item.isDone));
const completedItems = computed(() => data.value.filter((item) => item.isDone));
const pendingCount = computed(() => pendingItems.value.length);
const completedCount = computed(() => completedItems.value.length);
const currentYear = new Date().getFullYear();
onMounted(() => {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    data.value = JSON.parse(savedData);
  } else {
    localStorage.setItem("data", JSON.stringify(data.value));
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
