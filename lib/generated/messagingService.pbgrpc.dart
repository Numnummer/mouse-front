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

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:grpc/service_api.dart' as $grpc;
import 'package:protobuf/protobuf.dart' as $pb;

import 'messagingService.pb.dart' as $0;

export 'messagingService.pb.dart';

class MessagingClient extends $grpc.Client {
  /// The hostname for this service.
  static const $core.String defaultHost = '';

  /// OAuth scopes needed for the client.
  static const $core.List<$core.String> oauthScopes = [
    '',
  ];

  static final _$sendMulticastMessage = $grpc.ClientMethod<$0.MulticastMessageRequest, $0.MessageResponse>(
      '/Messaging/SendMulticastMessage',
      ($0.MulticastMessageRequest value) => value.writeToBuffer(),
      ($core.List<$core.int> value) => $0.MessageResponse.fromBuffer(value));
  static final _$sendUnicastMessage = $grpc.ClientMethod<$0.UnicastMessageRequest, $0.MessageResponse>(
      '/Messaging/SendUnicastMessage',
      ($0.UnicastMessageRequest value) => value.writeToBuffer(),
      ($core.List<$core.int> value) => $0.MessageResponse.fromBuffer(value));

  MessagingClient(super.channel, {super.options, super.interceptors});

  $grpc.ResponseFuture<$0.MessageResponse> sendMulticastMessage($0.MulticastMessageRequest request, {$grpc.CallOptions? options}) {
    return $createUnaryCall(_$sendMulticastMessage, request, options: options);
  }

  $grpc.ResponseFuture<$0.MessageResponse> sendUnicastMessage($0.UnicastMessageRequest request, {$grpc.CallOptions? options}) {
    return $createUnaryCall(_$sendUnicastMessage, request, options: options);
  }
}

abstract class MessagingServiceBase extends $grpc.Service {
  $core.String get $name => 'Messaging';

  MessagingServiceBase() {
    $addMethod($grpc.ServiceMethod<$0.MulticastMessageRequest, $0.MessageResponse>(
        'SendMulticastMessage',
        sendMulticastMessage_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.MulticastMessageRequest.fromBuffer(value),
        ($0.MessageResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.UnicastMessageRequest, $0.MessageResponse>(
        'SendUnicastMessage',
        sendUnicastMessage_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.UnicastMessageRequest.fromBuffer(value),
        ($0.MessageResponse value) => value.writeToBuffer()));
  }

  $async.Future<$0.MessageResponse> sendMulticastMessage_Pre($grpc.ServiceCall $call, $async.Future<$0.MulticastMessageRequest> $request) async {
    return sendMulticastMessage($call, await $request);
  }

  $async.Future<$0.MessageResponse> sendUnicastMessage_Pre($grpc.ServiceCall $call, $async.Future<$0.UnicastMessageRequest> $request) async {
    return sendUnicastMessage($call, await $request);
  }

  $async.Future<$0.MessageResponse> sendMulticastMessage($grpc.ServiceCall call, $0.MulticastMessageRequest request);
  $async.Future<$0.MessageResponse> sendUnicastMessage($grpc.ServiceCall call, $0.UnicastMessageRequest request);
}
