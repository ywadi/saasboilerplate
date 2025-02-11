// Toast notification utility
import { toast as sonner } from 'svelte-sonner';

export const toast = {
  success: (message) => {
    sonner.success(message);
  },
  error: (message) => {
    sonner.error(message);
  },
  info: (message) => {
    sonner.message(message);
  }
};
