declare module '@ckeditor/ckeditor5-react' {
  import type { EventInfo } from '@ckeditor/ckeditor5-utils';
  import ClassicEditor from 'itm-ckeditor';
  import * as React from 'react';
  import { WatchdogConfig } from '@ckeditor/ckeditor5-watchdog/src/watchdog';
  import { EditorConfig } from '@ckeditor/ckeditor5-core';

  export interface CKEditorErrorDetails {
    phase: 'initialization' | 'runtime';
    willEditorRestart?: boolean;
  }

  export interface CKEditorProps {
    editor: typeof ClassicEditor;
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

  export const CKEditor: React.FunctionComponent<CKEditorProps>;
}
