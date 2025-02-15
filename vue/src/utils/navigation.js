import { useRouter } from 'vue-router';

/**
 * Хук для використання навігаційних функцій у компонентах
 */
export function useNavigation() {
  const router = useRouter();

  return {
    /**
     * Перехід на іншу сторінку з додаванням в історію
     * @param {string} path - Шлях до сторінки
     */
    goTo: (path) => {
      router.push(path);
    },

    /**
     * Перехід на іншу сторінку без додавання в історію
     * @param {string} path - Шлях до сторінки
     */
    replaceTo: (path) => {
      router.replace(path);
    },
  };
}