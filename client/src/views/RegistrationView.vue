<script setup lang="ts">
import { ref, computed } from "vue";
import { IUser, TUserRole } from "@/models/user.model";
import { useAuthStore } from "@/stores/auth";
import { RouteNames } from "@/router/RouteNames";
import { TLogin } from "@/types/user.type";
import PasswordValidation from "@/components/ui/PasswordValidation.vue";

const authStore = useAuthStore();
const { login } = authStore;

const form = ref<IUser>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  role: TUserRole.OWNER,
  address: {
    street: '',
    city: '',
    coordinates: [0, 0]
  }
});

const selectedRole = ref<TUserRole>(TUserRole.OWNER);

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return form.value.email ? emailRegex.test(form.value.email) : false;
});

const isPasswordValid = computed(() => {
  const password = form.value.password;
  if (!password) return false;

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  return hasLowercase && hasUppercase && hasNumber && hasMinLength;
});

const isNameValid = computed(() => {
  return form.value.firstName.trim().length > 1 && form.value.lastName.trim().length > 1;
});

const isAddressValid = computed(() => {
  if (selectedRole.value === TUserRole.OWNER) {
    return form.value.address?.street?.trim().length > 2 && form.value.address?.city?.trim().length > 2;
  }
  return true;
});

const isCityValid = computed(() => {
  if (selectedRole.value === TUserRole.WALKER)
    return form.value.address?.city?.trim().length > 2;

  return true;
});

const isValidated = computed(() => {
  const baseValid = isEmailValid.value && isPasswordValid.value && isNameValid.value;

  if (selectedRole.value === TUserRole.OWNER)
    return baseValid && isAddressValid.value;
  else
    return baseValid && isCityValid.value;

});

const onSubmit = async () => {
  if (isValidated.value) {
    const registrationData = {
      ...form.value,
      role: selectedRole.value,
      address: selectedRole.value === TUserRole.OWNER ? form.value.address : { city: form.value.address?.city }
    };

    console.log('Registration data:', registrationData);

    login({
      email: form.value.email,
      password: form.value.password
    } as TLogin);
  }
};

const onRoleChange = (role: TUserRole) => {
  selectedRole.value = role;
  form.value.role = role;

  if (role === TUserRole.WALKER)
    form.value.address = { city: '', street: '', coordinates: [0, 0] };
};
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen">
    <Card class="w-full md:w-6 lg:w-4">
      <template #title>Регистрация</template>
      <template #content>
        <form @submit.prevent="onSubmit">
          <div class="field mb-4">
            <div class="flex gap-3">
              <Button
                type="button"
                :label="'Владелец собаки'"
                :severity="selectedRole === TUserRole.OWNER ? 'primary' : 'secondary'"
                @click="onRoleChange(TUserRole.OWNER)"
                class="flex-1"
              />
              <Button
                type="button"
                :label="'Выгульщик'"
                :severity="selectedRole === TUserRole.WALKER ? 'primary' : 'secondary'"
                @click="onRoleChange(TUserRole.WALKER)"
                class="flex-1"
              />
            </div>
          </div>

          <div class="field">
            <label for="firstName">Имя</label>
            <InputText
              id="firstName"
              v-model="form.firstName"
              class="w-full"
              :class="{ 'p-invalid': form.firstName && !isNameValid }"
            />
            <small v-if="form.firstName && !isNameValid" class="p-error">
              Введите корректное имя
            </small>
          </div>

          <div class="field">
            <label for="lastName">Фамилия</label>
            <InputText
              id="lastName"
              v-model="form.lastName"
              class="w-full"
              :class="{ 'p-invalid': form.lastName && !isNameValid }"
            />
          </div>

          <div class="field">
            <label for="email">Почта</label>
            <InputText
              id="email"
              v-model="form.email"
              type="email"
              class="w-full"
              :class="{ 'p-invalid': form.email && !isEmailValid }"
            />
            <small v-if="form.email && !isEmailValid" class="p-error">
              Введите корректный email
            </small>
          </div>

          <div class="field">
            <label for="password">Пароль</label>
            <PasswordValidation
              id="password"
              v-model="form.password"
            />
            <small v-if="form.password && !isPasswordValid" class="p-error">
              Пароль не соответствует требованиям
            </small>
          </div>

          <div class="field" v-if="selectedRole === TUserRole.WALKER">
            <label for="city">Город работы</label>
            <InputText
              id="city"
              v-model="form.address.city"
              class="w-full"
              :class="{ 'p-invalid': form.address.city && !isCityValid }"
              placeholder="В каком городе вы готовы выгуливать собак?"
            />
            <small v-if="form.address.city && !isCityValid" class="p-error">
              Введите корректный город
            </small>
          </div>

          <div class="field" v-if="selectedRole === TUserRole.OWNER">
            <label for="ownerCity">Город</label>
            <InputText
              id="ownerCity"
              v-model="form.address.city"
              class="w-full"
              :class="{ 'p-invalid': form.address.city && !isAddressValid }"
              placeholder="Ваш город"
            />
          </div>

          <div class="field" v-if="selectedRole === TUserRole.OWNER">
            <label for="street">Улица и дом</label>
            <InputText
              id="street"
              v-model="form.address.street"
              class="w-full"
              :class="{ 'p-invalid': form.address.street && !isAddressValid }"
              placeholder="Улица, дом, квартира"
            />
            <small v-if="(form.address.street || form.address.city) && !isAddressValid" class="p-error">
              Заполните адрес полностью
            </small>
          </div>

          <Button
            type="submit"
            :label="selectedRole === TUserRole.OWNER ? 'Зарегистрироваться как владелец' : 'Зарегистрироваться как выгульщик'"
            :disabled="!isValidated"
            class="w-full mt-3"
          />
        </form>

        <Divider class="my-4 block" />

        <div class="text-center">
          <span class="text-sm text-color-secondary">Уже есть аккаунт? </span>
          <router-link :to="RouteNames.login" class="text-sm text-primary no-underline">
            Войти
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>
