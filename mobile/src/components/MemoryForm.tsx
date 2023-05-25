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
import { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'

import NLWLogo from '../../src/assets/nlw-spacetime-logo.svg'

interface Memory {
  id?: string
  userId: string
  memoryDate: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

interface MemoryFormProps {
  memory?: Memory
  handleSubmitMemory: (
    memoryDate: Date,
    preview: string,
    isPublic: boolean,
    content: string,
  ) => void
}

export default function MemoryForm({
  memory,
  handleSubmitMemory,
}: MemoryFormProps) {
  const { bottom, top } = useSafeAreaInsets()

  const [datePicker, setDatePicker] = useState(false)

  const [memoryDate, setMemoryDate] = useState(new Date())
  const [preview, setPreview] = useState<string>('')
  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')

  function showDatePicker() {
    setDatePicker(true)
  }

  function onDateSelected(event, value) {
    setMemoryDate(value)
    setDatePicker(false)
  }

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

  useEffect(() => {
    if (memory) {
      setMemoryDate(new Date(memory.memoryDate))
      setPreview(memory.coverUrl)
      setIsPublic(memory.isPublic)
      setContent(memory.content)
    }
  }, [memory])

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
          onPress={() =>
            handleSubmitMemory(memoryDate, preview, isPublic, content)
          }
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
