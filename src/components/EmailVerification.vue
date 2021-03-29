<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" lg="10" md="10">
      <v-card class="mt-4">
        <v-card-title class="font-weight-bold">
          تأكيد البريد الالكتروني
        </v-card-title>
        <v-card-text>
          <span class="text-subtitle-1 font-weight-black">
            مرحبا بك
            <b>
              {{ currentUserName }}
            </b>
          </span>
          <br class="mb-5" />
          <span class="text-subtitle-2"
            >شكرا لتسجيلك! قبل البدء ، يمكنك التحقق من عنوان بريدك الإلكتروني من
            خلال النقر على الرابط الذي أرسلناه إليك عبر البريد الإلكتروني للتو؟
            إذا لم تتلق البريد الإلكتروني ، فسنرسل لك رسالة أخرى بكل سرور.</span
          >
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="teal darken-3"
            class="mb-1 white--text"
            :loading="emailVerificationLoading"
            @click="resendVerificationEmail"
          >
            إعادة إرسال البريد الإلكتروني
          </v-btn>
          <span v-if="emailResend" class="teal--text darken-3 px-3"
            >تم إرسال رابط تحقق جديد إلى عنوان البريد الإلكتروني الذي قدمته
            أثناء التسجيل.</span
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    currentUserName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("AuthStore", ["emailVerificationLoading", "emailResend"]),
  },
  methods: {
    ...mapActions("AuthStore", ["resendVerificationEmail"]),
  },
};
</script>

<style>
</style>