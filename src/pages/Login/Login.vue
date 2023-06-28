<template>
  <div class="wrapper">
    <div class="header">
      <img class="header-logo" :src="logoImg" />
      <h1 class="header-title">塾専用コミュニケーション &業務管理システム</h1>
      <div class="header-link">
        <Dropdown></Dropdown>
      </div>
      <div class="header-login-btn">塾講師ログイン</div>
      <template class="header-action__mobile">
        <Icon v-if="isOpenDrawer" name="close" @click="() => isOpenDrawer = false"/>
        <Icon v-else name="fold" @click="() => isOpenDrawer = true"/>
      </template>
    </div>
    <Drawer class="drawer" v-if="isOpenDrawer && isMobile"></Drawer>
    <div class="container" v-else>
      <div class="title">
        <h1>その他の登録</h1>
      </div>
      <div class="login-methods">
        <div class="login-methods-item">
          <p>
            メールアドレス（共通アカウント）で
            <br />
            ログインする場合はこちら
          </p>
          <button class="btn__yellow">共通アカウントログイン</button>
        </div>
        <div class="login-methods-item">
          <p>
            Comiruをすでに友達に追加済みの方
            <br />
            以下のアイコンをクリックしてログイン
          </p>
          <img style="height: 36px; width: 36px" :src="btnBase" />
        </div>
        <div class="login-methods-item">
          <p>
            ComiruをLINEではじめてお使いの方
            <br />
            以下のアイコンをクリックして友だち追加
          </p>
          <img style="height: 36px" :src="ja" />
        </div>
      </div>
      <div class="title">
        <h1>生徒・保護者ログイン<span>（スクールポパー）</span></h1>
      </div>
      <p>
        生徒番号とパスワードを入力してログインしてください。
        <span style="font-size: larger; color: #000000">生徒番号</span>
        や
        <span style="font-size: larger; color: #000000">パスワード</span>
        がわからない場合は、教室にお問い合わせください。
      </p>
      <div style="margin-top: 8px">
        <div class="form-item">
          <label style="display: inline-block">
            <input type="radio" name="role" value="parent" checked />
            保護者
          </label>
          <label style="display: inline-block">
            <input type="radio" name="role" value="subStudent" />
            生徒
          </label>
        </div>
        <div class="form-item">
          <label class="form-label">生徒番号</label>
          <input class="form-input" type="text" name="account" />
        </div>
        <div class="form-item">
          <label class="form-label">パスワード</label>
          <input class="form-input" :type="passwordMode" name="password" />
        </div>
        <div class="form-item">
          <label style="display: inline-block">
            <input
              class="custom-checkbox"
              type="checkbox"
              v-model="isPasswordShow"
            />
            パスワードを表示
          </label>
        </div>
        <div class="form-item">
          <button class="submit-btn" @click="submitForm">ログインする</button>
        </div>
      </div>
      <li>
        <a style="color: #16bfb7; text-decoration: underline"
          >パスワードを忘れた方はこちら</a
        >
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import logoImg from '@/assets/images/logo.png'
import btnBase from '@/assets/images/btn_base.png'
import ja from '@/assets/images/ja.png'
import { useRouter } from 'vue-router'
import Dropdown from '@/pages/Login/components/dropdown.vue'
import Drawer from '@/pages/Login/components/drawer.vue'
import Icon from '@/components/icon/icon.vue'

const isPasswordShow = ref(false)
const isOpenDrawer = ref(false)
const isMobile = ref(false)

const router = useRouter()

const passwordMode = computed(() => {
  return isPasswordShow.value ? 'text' : 'password'
})

onMounted(() => {
  window.matchMedia('(max-width: 800px)').addEventListener('change', matchMedia)
  const MediaQueryList = window.matchMedia('(max-width: 800px)')
  isMobile.value = MediaQueryList.matches
})

onUnmounted(() => {
  window
    .matchMedia('(max-width: 800px)')
    .removeEventListener('change', matchMedia)
})

function matchMedia(e: Event) {
  const target = e.target as MediaQueryList
  isMobile.value = target.matches
}

function submitForm() {
  router.replace({
    path: '/articles',
  })
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
  text-align: left;
  color: #493b32;
}

input[type='radio'] {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-clip: content-box;
  border: 1px solid #a9a9a9;
  vertical-align: top;
}

input[type='radio']:checked {
  background-color: #16bfb7;
  border-color: #16bfb7;
  padding: 2px;
}

input[type='checkbox']:checked {
  background-color: #00a1e9;
  color: white;
}

input[type='checkbox'] {
  background-color: white;
  color: black;
}

.custom-checkbox {
  vertical-align: middle;
  visibility: hidden;
  position: relative;
  cursor: pointer;
}

.custom-checkbox:checked:before {
  border-color: #16bfb7;
  background-color: #16bfb7;
}
.custom-checkbox:checked:after {
  visibility: visible;
}

.custom-checkbox::before {
  display: block;
  visibility: visible;
  content: '';
  position: absolute;
  width: 13px;
  height: 13px;
  border: 1px solid #a9a9a9;
  border-radius: 5px;
}

.custom-checkbox::after {
  display: block;
  visibility: hidden;
  content: '';
  width: 2px;
  height: 6px;
  position: absolute;
  left: 5px;
  top: 3px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
}

.wrapper {
  position: relative;
  background-color: #fff;
  padding: 0;
  width: 100%;
  height: 100%;
}

.header {
  position: fixed;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 2000;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &-logo {
    width: 172px;
    height: 40px;
  }

  &-title {
    width: 170px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #493b32;
    margin-left: 16px;
  }

  &-link {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  &-login-btn {
    height: 32px;
    padding: 0 10px;
    border-radius: 16px;
    background-color: #fddc3e;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
  }

  &-action__mobile {
    display: none;
  }
}

.container {
  max-width: 1100px;
  padding-left: 20px;
  width: 90%;
  position: relative;
  margin: auto;
  padding: 60px 20px 100px 20px;
  transition: 0.5s padding-left;

  .title {
    margin-top: 40px;

    h1 {
      margin-bottom: 20px;
      font-size: 25px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      font-weight: bold;

      span {
        font-size: 80%;
      }
    }
  }

  .login-methods {
    display: flex;
    .login-methods-item {
      flex: 1;
      border-right: 2px solid #b4a094;
      padding: 0 8px;
      text-align: center;
      color: #493b32;

      p {
        text-align: center;
      }

      &:last-child {
        border-right: none;
      }
    }

    .btn__yellow {
      height: 32px;
      line-height: 32px;
      font-weight: bold;
      font-size: 14px;
      padding: 0 28px;
      text-align: center;
      background-color: #fddc3e;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      vertical-align: middle;
      text-decoration: none;
      display: inline-block;
      outline: none;
    }
  }

  .form-item {
    margin: 10px 0;
  }

  .form-label {
    display: block;
    margin: 6px 0 3px;
    font-weight: 700;
  }

  .form-input {
    width: 100%;
    max-width: 540px;
    padding: 10px 8px;
    font-size: 16px;
    line-height: 1;
    border: solid 1px #d0d0d5;
    border-radius: 4px;
    background: #fff;
  }

  .submit-btn {
    display: inline-block;
    position: relative;
    height: 36.4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0 28px;
    border: 1px solid transparent;
    border-radius: 16px;
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: 14px;
    text-decoration: none;
    line-height: 36.4px;
    background: #16bfb7;
    cursor: pointer;
  }

  .form-input:focus {
    outline: 0;
    border: 1px solid #16bfb7;
  }
}

.drawer {
  display: none;
}

@media screen and (max-width: 800px) {
  p {
    font-size: 13px;
  }
  .header {
    height: 44px;
    padding: 0 16px;

    &-logo {
      width: 86px;
      height: 20px;
    }

    &-title {
      display: none;
    }

    &-login-btn {
      display: none;
    }

    &-link {
      display: none;
    }
  }

  .container {
    padding: 60px 0 100px 0;
    width: 95%;

    .title {
      margin-top: 20px;
    }

    .login-methods {
      flex-direction: column;

      .login-methods-item {
        border-right: none;
        border-bottom: 2px solid #b4a094;
        padding: 16px 8px;
      }
    }
  }

  .drawer {
    display: flex;
  }

  .header-action__mobile {
    display: block;
  }
}
</style>
