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

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

export 'package:protobuf/protobuf.dart' show GeneratedMessageGenericExtensions;

class MulticastMessageRequest extends $pb.GeneratedMessage {
  factory MulticastMessageRequest({
    $core.String? author,
    $core.String? messageText,
    $core.String? destination,
    $core.String? role,
    $core.Iterable<$core.String>? fileNames,
    $core.Iterable<$core.List<$core.int>>? filesContentBase64,
    $core.Iterable<$core.String>? filesMetadata,
  }) {
    final result = create();
    if (author != null) result.author = author;
    if (messageText != null) result.messageText = messageText;
    if (destination != null) result.destination = destination;
    if (role != null) result.role = role;
    if (fileNames != null) result.fileNames.addAll(fileNames);
    if (filesContentBase64 != null) result.filesContentBase64.addAll(filesContentBase64);
    if (filesMetadata != null) result.filesMetadata.addAll(filesMetadata);
    return result;
  }

  MulticastMessageRequest._();

  factory MulticastMessageRequest.fromBuffer($core.List<$core.int> data, [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(data, registry);
  factory MulticastMessageRequest.fromJson($core.String json, [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'MulticastMessageRequest', createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'author')
    ..aOS(2, _omitFieldNames ? '' : 'messageText')
    ..aOS(3, _omitFieldNames ? '' : 'destination')
    ..aOS(4, _omitFieldNames ? '' : 'role')
    ..pPS(5, _omitFieldNames ? '' : 'fileNames')
    ..p<$core.List<$core.int>>(6, _omitFieldNames ? '' : 'filesContentBase64', $pb.PbFieldType.PY)
    ..pPS(7, _omitFieldNames ? '' : 'filesMetadata')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  MulticastMessageRequest clone() => MulticastMessageRequest()..mergeFromMessage(this);
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  MulticastMessageRequest copyWith(void Function(MulticastMessageRequest) updates) => super.copyWith((message) => updates(message as MulticastMessageRequest)) as MulticastMessageRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static MulticastMessageRequest create() => MulticastMessageRequest._();
  @$core.override
  MulticastMessageRequest createEmptyInstance() => create();
  static $pb.PbList<MulticastMessageRequest> createRepeated() => $pb.PbList<MulticastMessageRequest>();
  @$core.pragma('dart2js:noInline')
  static MulticastMessageRequest getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<MulticastMessageRequest>(create);
  static MulticastMessageRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get author => $_getSZ(0);
  @$pb.TagNumber(1)
  set author($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasAuthor() => $_has(0);
  @$pb.TagNumber(1)
  void clearAuthor() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get messageText => $_getSZ(1);
  @$pb.TagNumber(2)
  set messageText($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessageText() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessageText() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get destination => $_getSZ(2);
  @$pb.TagNumber(3)
  set destination($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasDestination() => $_has(2);
  @$pb.TagNumber(3)
  void clearDestination() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get role => $_getSZ(3);
  @$pb.TagNumber(4)
  set role($core.String value) => $_setString(3, value);
  @$pb.TagNumber(4)
  $core.bool hasRole() => $_has(3);
  @$pb.TagNumber(4)
  void clearRole() => clearField(4);

  @$pb.TagNumber(5)
  $core.List get fileNames => $_getList(4);

  @$pb.TagNumber(6)
  $core.List get filesContentBase64 => $_getList(5);

  @$pb.TagNumber(7)
  $core.List get filesMetadata => $_getList(6);
}

class UnicastMessageRequest extends $pb.GeneratedMessage {
  factory UnicastMessageRequest({
    $core.String? author,
    $core.String? messageText,
    $core.String? destination,
    $core.Iterable<$core.String>? fileNames,
    $core.Iterable<$core.List<$core.int>>? filesContent,
    $core.Iterable<$core.String>? filesMetadata,
  }) {
    final result = create();
    if (author != null) result.author = author;
    if (messageText != null) result.messageText = messageText;
    if (destination != null) result.destination = destination;
    if (fileNames != null) result.fileNames.addAll(fileNames);
    if (filesContent != null) result.filesContent.addAll(filesContent);
    if (filesMetadata != null) result.filesMetadata.addAll(filesMetadata);
    return result;
  }

  UnicastMessageRequest._();

  factory UnicastMessageRequest.fromBuffer($core.List<$core.int> data, [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(data, registry);
  factory UnicastMessageRequest.fromJson($core.String json, [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'UnicastMessageRequest', createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'author')
    ..aOS(2, _omitFieldNames ? '' : 'messageText')
    ..aOS(3, _omitFieldNames ? '' : 'destination')
    ..pPS(4, _omitFieldNames ? '' : 'fileNames')
    ..p<$core.List<$core.int>>(5, _omitFieldNames ? '' : 'filesContent', $pb.PbFieldType.PY)
    ..pPS(6, _omitFieldNames ? '' : 'filesMetadata')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  UnicastMessageRequest clone() => UnicastMessageRequest()..mergeFromMessage(this);
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  UnicastMessageRequest copyWith(void Function(UnicastMessageRequest) updates) => super.copyWith((message) => updates(message as UnicastMessageRequest)) as UnicastMessageRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static UnicastMessageRequest create() => UnicastMessageRequest._();
  @$core.override
  UnicastMessageRequest createEmptyInstance() => create();
  static $pb.PbList<UnicastMessageRequest> createRepeated() => $pb.PbList<UnicastMessageRequest>();
  @$core.pragma('dart2js:noInline')
  static UnicastMessageRequest getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<UnicastMessageRequest>(create);
  static UnicastMessageRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get author => $_getSZ(0);
  @$pb.TagNumber(1)
  set author($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasAuthor() => $_has(0);
  @$pb.TagNumber(1)
  void clearAuthor() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get messageText => $_getSZ(1);
  @$pb.TagNumber(2)
  set messageText($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessageText() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessageText() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get destination => $_getSZ(2);
  @$pb.TagNumber(3)
  set destination($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasDestination() => $_has(2);
  @$pb.TagNumber(3)
  void clearDestination() => clearField(3);

  @$pb.TagNumber(4)
  $core.List get fileNames => $_getList(3);

  @$pb.TagNumber(5)
  $core.List get filesContent => $_getList(4);

  @$pb.TagNumber(6)
  $core.List get filesMetadata => $_getList(5);
}

class MessageResponse extends $pb.GeneratedMessage {
  factory MessageResponse({
    $core.bool? success,
    $core.String? message,
  }) {
    final result = create();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    return result;
  }

  MessageResponse._();

  factory MessageResponse.fromBuffer($core.List<$core.int> data, [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(data, registry);
  factory MessageResponse.fromJson($core.String json, [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'MessageResponse', createEmptyInstance: create)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  MessageResponse clone() => MessageResponse()..mergeFromMessage(this);
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  MessageResponse copyWith(void Function(MessageResponse) updates) => super.copyWith((message) => updates(message as MessageResponse)) as MessageResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static MessageResponse create() => MessageResponse._();
  @$core.override
  MessageResponse createEmptyInstance() => create();
  static $pb.PbList<MessageResponse> createRepeated() => $pb.PbList<MessageResponse>();
  @$core.pragma('dart2js:noInline')
  static MessageResponse getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<MessageResponse>(create);
  static MessageResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => clearField(2);
}


const $core.bool _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const $core.bool _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
