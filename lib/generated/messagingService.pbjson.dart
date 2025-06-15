//
//  Generated code. Do not modify.
//  source: messagingService.proto
//
// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use multicastMessageRequestDescriptor instead')
const MulticastMessageRequest$json = {
  '1': 'MulticastMessageRequest',
  '2': [
    {'1': 'author', '3': 1, '4': 1, '5': 9, '10': 'author'},
    {'1': 'message_text', '3': 2, '4': 1, '5': 9, '10': 'messageText'},
    {'1': 'destination', '3': 3, '4': 1, '5': 9, '10': 'destination'},
    {'1': 'role', '3': 4, '4': 1, '5': 9, '10': 'role'},
    {'1': 'file_names', '3': 5, '4': 3, '5': 9, '10': 'fileNames'},
    {'1': 'files_content_base64', '3': 6, '4': 3, '5': 12, '10': 'filesContentBase64'},
    {'1': 'files_metadata', '3': 7, '4': 3, '5': 9, '10': 'filesMetadata'},
  ],
};

/// Descriptor for `MulticastMessageRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List multicastMessageRequestDescriptor = $convert.base64Decode(
    'ChdNdWx0aWNhc3RNZXNzYWdlUmVxdWVzdBIWCgZhdXRob3IYASABKAlSBmF1dGhvchIhCgxtZX'
    'NzYWdlX3RleHQYAiABKAlSC21lc3NhZ2VUZXh0EiAKC2Rlc3RpbmF0aW9uGAMgASgJUgtkZXN0'
    'aW5hdGlvbhISCgRyb2xlGAQgASgJUgRyb2xlEh0KCmZpbGVfbmFtZXMYBSADKAlSCWZpbGVOYW'
    '1lcxIwChRmaWxlc19jb250ZW50X2Jhc2U2NBgGIAMoDFISZmlsZXNDb250ZW50QmFzZTY0EiUK'
    'DmZpbGVzX21ldGFkYXRhGAcgAygJUg1maWxlc01ldGFkYXRh');

@$core.Deprecated('Use unicastMessageRequestDescriptor instead')
const UnicastMessageRequest$json = {
  '1': 'UnicastMessageRequest',
  '2': [
    {'1': 'author', '3': 1, '4': 1, '5': 9, '10': 'author'},
    {'1': 'message_text', '3': 2, '4': 1, '5': 9, '10': 'messageText'},
    {'1': 'destination', '3': 3, '4': 1, '5': 9, '10': 'destination'},
    {'1': 'file_names', '3': 4, '4': 3, '5': 9, '10': 'fileNames'},
    {'1': 'files_content', '3': 5, '4': 3, '5': 12, '10': 'filesContent'},
    {'1': 'files_metadata', '3': 6, '4': 3, '5': 9, '10': 'filesMetadata'},
  ],
};

/// Descriptor for `UnicastMessageRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List unicastMessageRequestDescriptor = $convert.base64Decode(
    'ChVVbmljYXN0TWVzc2FnZVJlcXVlc3QSFgoGYXV0aG9yGAEgASgJUgZhdXRob3ISIQoMbWVzc2'
    'FnZV90ZXh0GAIgASgJUgttZXNzYWdlVGV4dBIgCgtkZXN0aW5hdGlvbhgDIAEoCVILZGVzdGlu'
    'YXRpb24SHQoKZmlsZV9uYW1lcxgEIAMoCVIJZmlsZU5hbWVzEiMKDWZpbGVzX2NvbnRlbnQYBS'
    'ADKAxSDGZpbGVzQ29udGVudBIlCg5maWxlc19tZXRhZGF0YRgGIAMoCVINZmlsZXNNZXRhZGF0'
    'YQ==');

@$core.Deprecated('Use messageResponseDescriptor instead')
const MessageResponse$json = {
  '1': 'MessageResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
  ],
};

/// Descriptor for `MessageResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List messageResponseDescriptor = $convert.base64Decode(
    'Cg9NZXNzYWdlUmVzcG9uc2USGAoHc3VjY2VzcxgBIAEoCFIHc3VjY2VzcxIYCgdtZXNzYWdlGA'
    'IgASgJUgdtZXNzYWdl');

