import {  Stack, TextField } from "@fluentui/react"
import React from 'react'

export interface AddCommentComponentProps {
  setCommentInfo(text: string): any
}
// const stackStyles: Partial<IStackStyles> = { root: { width: 290 } }
// const stackTokens = { childrenGap: 15 }

function AddCommentComponent({
  addCommentComponentProps,
}: {
  addCommentComponentProps: AddCommentComponentProps
}) {
  const [textComment, setTextComment] = React.useState<string>()

  const handleTextChangeT = (e: any, value: any) => {
    setTextComment(value)
    addCommentComponentProps.setCommentInfo(textComment!)
  }
  return (
    <>
      <div className="mt-3 rounded-sm border-solid">
        <label style={{ fontFamily: 'caption' }}>Dodaj komentar</label>
        <div className="border-4 border-solid ">
          <Stack>
            <TextField
              multiline
              className="w-5"
              style={{ width: '200px' }}
              rows={3}
              onChange={handleTextChangeT}
            />
          </Stack>
        </div>
      </div>
    </>
  )
}

export default AddCommentComponent