import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { CKEditor, CKEditorErrorDetails } from '@ckeditor/ckeditor5-react';
import { EventInfo } from '@ckeditor/ckeditor5-utils';
import { WatchdogConfig } from '@ckeditor/ckeditor5-watchdog/src/watchdog';
import ClassicEditor from 'itm-ckeditor';
import * as React from 'react';

export interface FieldEditorProps {
  isInvalid?: any;
  className?: string;

  editor?: typeof ClassicEditor;
  id?: string;
  diabled?: boolean;
  data?: string;
  config?: EditorConfig;
  watchdogConfig?: WatchdogConfig;
  disableWatchdog?: boolean;
  onReady?: (editor: typeof ClassicEditor) => void;
  onError?: (error: Error, details: CKEditorErrorDetails) => void;
  onChange?: (event: EventInfo, editor: typeof ClassicEditor) => void;
  onFocus?: (event: EventInfo, editor: typeof ClassicEditor) => void;
  onBlur?: (event: EventInfo, editor: typeof ClassicEditor) => void;
}

export const FieldEditor = (props: FieldEditorProps) => {
  let { isInvalid, className, ...fieldProps } = props;
  if (isInvalid)
    className = className ? `${className} is-invalid` : 'is-invalid';

  return (
    <div className={className}>
      <CKEditor {...fieldProps} editor={ClassicEditor} />
    </div>
  );
};
