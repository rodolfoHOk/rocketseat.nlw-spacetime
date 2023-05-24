import {
  Image,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import DateTimePicker from '@react-native-community/datetimepicker'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { useState } from 'react'
import { api } from '../src/lib/api'
import dayjs from 'dayjs'

export default function NewMemory() {
  // test
  const [datePicker, setDatePicker] = useState(false)
  const [memoryDate, setMemoryDate] = useState(new Date())

  function showDatePicker() {
    setDatePicker(true)
  }

  function onDateSelected(event, value) {
    setMemoryDate(value)
    setDatePicker(false)
  }
  // end test
  const router = useRouter()

  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.png',
        type: 'image/png',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories',
      {
        memoryDate,
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

  return (
    <ScrollView
      className="mb-2 flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        {/* Test */}
        <View>
          {datePicker && (
            <DateTimePicker
              value={memoryDate}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
            />
          )}

          <View className="flex-row items-center gap-2">
            <Text className="font-body text-base text-gray-200">
              Data da memória
            </Text>

            <TouchableOpacity
              onPress={showDatePicker}
              className="h-10 w-36 flex-row items-center justify-between rounded-lg border border-gray-400 bg-gray-700 px-4 font-body"
            >
              <Icon name="calendar" color="#FFF" size={16} />

              <Text className="text-gray-100">
                {dayjs(memoryDate.toISOString().split('T')[0]).format(
                  'DD/MM/YYYY',
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* End test */}

        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{
              false: '#767577',
              true: '#372568',
            }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9eA0'}
          />

          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        {preview ? (
          <Image
            className="h-32 w-full rounded-lg"
            source={{ uri: preview }}
            alt="preview"
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
            onPress={openImagePicker}
          >
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#FFF" />

              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor={'#56565a'}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
