import { Select } from 'antd'
import { FC, ReactNode, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { getSearchSuggest } from '@/api/modules/discover/recommend.js'
import { getAsyncSongDetail } from '@/reduxjsToolkitStore/modules/player/playerSlice.js'

import styles from './ContentRight.module.scss'

interface Iprops {
  children?: ReactNode
}

const ContentRight: FC<Iprops> = () => {
  const dispatch = useDispatch()
  interface Idata {
    label: string
    value: number
    name: string
  }
  // 获取选项
  async function getSongs(keywords: string): Promise<Idata[]> {
    return new Promise((resolve) => {
      getSearchSuggest(keywords).then((res) => {
        const _data = res.result.songs || []
        let songs = _data.map(
          (item: { name: any; id: number; artists: any[] }) => ({
            label: item.name,
            value: item.id,
            name: item.artists[0].name || ''
          })
        )
        resolve(songs)
      })
    })
  }

  // 使用防抖(函数是一个promise)
  const { data, loading, run } = useRequest(getSongs, {
    debounceWait: 1000,
    manual: true
  })
  // 变化的时候查询会触发
  const onSearch = (value: string) => {
    if (value) {
      console.log('-----调用接口查询-----', value)
      run(value)
    }
  }
  const onSelect = (value: number, option: any) => {
    console.log('======选中=====', value, option)
    dispatch(getAsyncSongDetail(value))
  }

  return (
    <div className={styles.right}>
      <div>
        <Select
          style={{ width: '254px' }}
          options={data}
          placeholder="歌曲搜索"
          onSelect={onSelect}
          optionLabelProp="label"
          optionFilterProp="label"
          onSearch={onSearch}
          showSearch
          loading={loading}
        />
      </div>
    </div>
  )
}

ContentRight.defaultProps = {}

export default memo(ContentRight)
